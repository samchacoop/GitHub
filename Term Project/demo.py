import dominate
from dominate.tags import *
from reader import *

print headTags
print bodyTags

tag_functions = {'link': link(), 'div': div()}
doc = dominate.document(title='test write page')

with doc:
    for index in bodyTags:
        try:
            result = tag_functions[index]
        except AttributeError:
            print "Didn't render " + index
        except KeyError:
            print "Key Error " + index

# doc = dominate.document(title='Dominate your HTML')
#
# with doc.head:
#     link(rel='stylesheet', href='style.css')
#     script(type='text/javascript', src='script.js')
#
# with doc:
#     with div(id='header').add(ol()):
#         for i in ['home', 'about', 'contact']:
#             li(a(i.title(), href='/%s.html' % i))
#
#     with div():
#         attr(cls='body')
#         p('Lorem ipsum..')

Html_file = open("output", "w")
Html_file.write(str(doc))
Html_file.close()
