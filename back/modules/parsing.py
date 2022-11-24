def parsing():
    f = open("./save.txt", 'r')
    lines = f.readlines()
    count = 1
    error_sentence = ""
    for line in lines:
        if count == 1 and line.startswith('E'):
            if count >= 5 and line.startswith('-----'):
                break
            if count >= 5:
                error_sentence += line
        count += 1
    return error_sentence
#print(parsing())