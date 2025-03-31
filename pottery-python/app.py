from flask import Flask, jsonify, request
import matplotlib.pyplot as plt
import plotly.graph_objs as go
import io
import base64

app = Flask(__name__)

@app.route("/generate-visualisation", methods=["POST"])
def generate_visualisation():

    data = request.json

    x = data.get('x', [])
    y = data.get('y', [])

    fig, ax = plt.subplots()

    ax.bar(x, y)

    ax.set_title("Sales per Ceramic Piece over Time")
    ax.set_xlabel("Ceramic Piece Name and Sale Time")
    ax.set_ylabel("Total Sales")

    plotly_fig = go.Figure(data=[go.Bar(x=x, y=y)])

    fig_html = plotly_fig.to_html(full_html=False, include_plotlyjs='cdn')

    return jsonify({'visualisation_html': fig_html})



@app.route("/generate-style-visualisation", methods=["POST"])
def generate_style_visualisation():
    data = request.json
    styles = data.get('styles', [])
    sales = data.get('sales', [])

    if not styles or not sales or len(styles) != len(sales):
        return jsonify({'error': 'Invalid data received'}), 400

    fig, ax = plt.subplots()
    colors = ['#636efa', '#ef6363', '#63efa7', '#efa563', '#ef63d1']
    ax.pie(sales, labels=styles, autopct='%1.1f%%', startangle=90, colors=colors[:len(styles)])
    ax.axis('equal')  
    img_bytes = io.BytesIO()
    plt.savefig(img_bytes, format='png')
    img_bytes.seek(0)
    img_base64 = base64.b64encode(img_bytes.getvalue()).decode('utf-8')
    pie_chart_html = f'<img src="data:image/png;base64,{img_base64}" />'

    return jsonify({'visualisation_html': pie_chart_html})



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3001)
