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


@app.route('/i1', methods=['GET', 'POST'])
def page_index_2():
    return render_template(
        'index_1.html'
    )
