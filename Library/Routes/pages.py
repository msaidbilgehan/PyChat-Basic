from Library import app

from flask import render_template


#############
### PAGEs ###
#############

@app.route('/', methods=['GET', 'POST'])
def page_index():
    return render_template(
        'index.html'
    )
