import re

import codecs
f=codecs.open("html_sample.html", 'r')
regex_text =  f.read()

def f(regexStr,target):
    mo = re.search(regexStr,target)
    if not mo:
        # print "NO MATCH"
        return 0
    else:
        # print "MATCH:", mo.group()
        return mo


noScript = f("(<script>(.*?)</script>)",regex_text)
# noStyle = f("(<h1 (.*?) >)",regex_text)
# outputStr = str(re.sub("</script>","",str(noStyle)))

tags = f("(<(.*?)>)",regex_text)
def num_groups(regex, regexText):
    list = re.findall(regex, regexText)
    return len(list)

def list_groups(regex, regexText):
    list = re.findall(regex, regexText)
    return list

tags_list = list_groups("(<(.*?)>)",regex_text)
print tags_list

tagNames = []
for index in tags_list: tagNames.append(index[1])
simpleTags = []
for index in tagNames: simpleTags.append(index.split()[0])
cleanSimpleTags = []
for index in simpleTags:
    if index[0] != '/':
        if ';' not in index:
            cleanSimpleTags.append(index)

# print cleanSimpleTags
# print list(set(cleanSimpleTags))

headTags = []
bodyTags = []
count = 0
for index in cleanSimpleTags:
    if count < 4:
        headTags.append(index)
    else:
        bodyTags.append(index)
    count+=1









