import argparse
import os
import chardet
import json
from pygments import lexers

from multimetric.cls.importer.filtered import FilteredImporter
from multimetric.cls.importer.pick import importer_pick
from multimetric.cls.modules import get_additional_parser_args
from multimetric.cls.modules import get_modules_calculated
from multimetric.cls.modules import get_modules_metrics
from multimetric.cls.modules import get_modules_stats
from modules.db import db

#ArgParser, file_process, CalculMetrics에 대한 License
"""
BSD 2-Clause License

Copyright (c) 2019, Konrad Weihmann
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
"""

class MultiMetrics:
    def ArgParser(f):
        parser = argparse.ArgumentParser(
            formatter_class=argparse.RawTextHelpFormatter,
            prog="multimetric", description='Calculate code metrics in various languages')
        parser.add_argument(
            "--warn_compiler",
            default=None,
            help="File(s) holding information about compiler warnings")
        parser.add_argument(
            "--warn_duplication",
            default=None,
            help="File(s) holding information about code duplications")
        parser.add_argument(
            "--warn_functional",
            default=None,
            help="File(s) holding information about static code analysis findings")
        parser.add_argument(
            "--warn_standard",
            default=None,
            help="File(s) holding information about language standard violations")
        parser.add_argument(
            "--warn_security",
            default=None,
            help="File(s) File(s) holding information about found security issue")
        parser.add_argument(
            "--coverage",
            default=None,
            help="File(s) with compiler warningsFile(s) holding information about testing coverage")
        parser.add_argument(
            "--dump",
            default=False,
            action="store_true",
            help="Just dump the token tree")
        parser.add_argument(
            "--jobs",
            type=int,
            default=1,
            help="Run x jobs in parallel")
        get_additional_parser_args(parser)
        parser.add_argument("files", nargs='+', help="Files to parse")
        RUNARGS = parser.parse_args([f])
        # Turn all paths to abs-paths right here
        RUNARGS.files = [os.path.abspath(x) for x in RUNARGS.files]
        return RUNARGS
    
    
    def file_process(_file, _args, _importer):
        res = {}
        store = {}
        _lexer = lexers.get_lexer_for_filename(_file)
        try:
            with open(_file, "rb") as i:
                _cnt = i.read()
                _enc = chardet.detect(_cnt)
                _cnt = _cnt.decode(_enc["encoding"]).encode("utf-8")
            _localImporter = {k: FilteredImporter(
                v, _file) for k, v in _importer.items()}
            tokens = list(_lexer.get_tokens(_cnt))
            if _args.dump:
                for x in tokens:
                    print("{}: {} -> {}".format(_file, x[0], str(x[1])))
            else:
                _localMetrics = get_modules_metrics(_args, **_localImporter)
                _localCalc = get_modules_calculated(_args, **_localImporter)
                for x in _localMetrics:
                    x.parse_tokens(_lexer.name, tokens)
                    res.update(x.get_results())
                    store.update(x.get_internal_store())
                for x in _localCalc:
                    res.update(x.get_results(res))
                    store.update(x.get_internal_store())
        except Exception:
            tokens = []
        return (res, _file, _lexer.name, tokens, store)
    
    
    """
    LOC : loc
    Halstead : Halstead effort
    Control flow 복잡도: Cyclomatic_complexity
    Data flow 복잡도: 
    """

    def CalculMetrics(class_id, assign_id, file_path):        
        _args =  MultiMetrics.ArgParser(file_path)
        _result = {"files": {}, "overall": {}}
        
        # Get importer
        _importer = {}
        _importer["import_compiler"] = importer_pick(_args, _args.warn_compiler)
        _importer["import_coverage"] = importer_pick(_args, _args.coverage)
        _importer["import_duplication"] = importer_pick(
            _args, _args.warn_duplication)
        _importer["import_functional"] = importer_pick(
            _args, _args.warn_functional)
        _importer["import_security"] = importer_pick(_args, _args.warn_standard)
        _importer["import_standard"] = importer_pick(_args, _args.warn_security)

        # sanity check
        _importer = {k: v for k, v in _importer.items() if v}
    
        results = [MultiMetrics.file_process(f, _args, _importer) for f in _args.files]
        for x in results:
            _result["files"][x[1]] = x[0]
        for m in get_modules_stats(_args, **_importer):
            _result = m.get_results(_result, "files", "overall")

        data=_result["files"]
        keys=list(data.keys())
        
        
        #processing Data Flow
        test_input=db.get_testcase_list(class_id, assign_id)[0][1]
        command='mprof run --python --timeout 10  {0}'.format(file_path)
        try:
            os.system('echo {0} | {1}'.format(test_input,command))
            os.system('mprof peak > mem_log.txt')
            os.system('mprof clean')
            temp_output=open("mem_log.txt","r")
            temp_output.readline()
            mem_max=temp_output.readline().strip().split("\t")[1].split(" ")[0]
            temp_output.close()
            os.remove('mem_log.txt')
        except:
            mem_max = 0

        # return Json
        code_efficiency={}
        code_efficiency['LOC']=data[keys[0]]["loc"]
        code_efficiency['Halstead']=data[keys[0]]["halstead_effort"]
        code_efficiency['Control_flow']=data[keys[0]]["cyclomatic_complexity"]
        code_efficiency['Data flow']=mem_max

        return(code_efficiency)

    def prepareMultiMetrics(class_id, assign_id):
        dir_path = "./data/class_%d/assign_%d" % (class_id, assign_id)
        anwser_path=dir_path+"/answer.py"
        anwser_metric_path= dir_path+"/anwser_metric.json"
        if not os.path.isfile(anwser_metric_path):
            anwser_metric=MultiMetrics.CalculMetrics(class_id,assign_id,anwser_path)
            with open(anwser_metric_path,'w') as f:
                json.dump(anwser_metric,f,ensure_ascii=False,indent=4)

    def calculeScore(class_id, assign_id, file_path):
        dir_path = "./data/class_%d/assign_%d" % (class_id, assign_id)
        anwser_metric_path= dir_path+"/anwser_metric.json"
        anwser_metric_f=open(anwser_metric_path,'r')
        anwser_json=json.load(anwser_metric_f)
        target_json=MultiMetrics.CalculMetrics(class_id, assign_id, file_path)
        anwser_metric_f.close()

        loc=round((anwser_json['LOC']/target_json['LOC'])*25)
        if loc>25:
            loc=25
        elif loc<0:
            loc=0
        
        halstead=round((anwser_json['Halstead']/target_json['Halstead'])*25)
        if halstead>25:
            halstead=25
        elif halstead<0:
            halstead=0

        control_flow=round((anwser_json['Control_flow']/target_json['Control_flow'])*25)
        if control_flow>25:
            control_flow=25
        elif control_flow<0:
            control_flow=0

        data_flow=round((float(anwser_json['Data flow'])/float(target_json['Data flow']))*25)
        if data_flow>25:
            data_flow=25
        elif data_flow<0:
            data_flow=0

        score={}
        score['LOC']=loc
        score['Halstead']=halstead
        score['Control_flow']=control_flow
        score['Data flow']=data_flow
        
        return score
        

