def parsing():
    f = open("./save.txt", 'r')
    lines = f.readlines()
    error_sentence = ""
    if lines[0].startswith('E'):
        count = 1
        for line in lines:
            if count >= 5 and line.startswith('-----'):
                break
            if count >= 5:
                error_sentence += line
            count = count + 1
    return error_sentence
#print(parsing())
