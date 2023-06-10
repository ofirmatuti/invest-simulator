import yfinance as yf
import datetime
from flask import Flask, jsonify, request
from flask_cors import CORS
import locale

app = Flask(__name__)
CORS(app)


@app.route('/investments', methods=['GET'])
def get_investments():
    start_month = request.args.get('start_month')
    if start_month is None:
        return "Missing start_month parameter", 400

    try:
        datetime.datetime.strptime(start_month, '%Y-%m-%d')
    except ValueError:
        return jsonify({'error': 'Invalid start_month format. Please use YYYY-MM-DD.'}), 400

    monthly_investment = int(request.args.get('monthly_investment', 1000))

    sp500_data = yf.download('^GSPC', start=start_month, end=datetime.date.today().isoformat(), interval='1mo')

    investment_list = []

    total_net = 0
    total_invested = 0
    last_price = sp500_data['Open'][0]
    locale.setlocale(locale.LC_ALL, '')
    for date, row in sp500_data.iterrows():
        open_price = row['Open']
        roi = open_price / last_price
        last_price = open_price
        total_net = total_net * roi + monthly_investment
        total_invested += monthly_investment

        formatted_total_net = locale.format_string('%.2f', total_net, grouping=True)
        formatted_total_invested = locale.format_string('%.2f', total_invested, grouping=True)

        investment_object = {
            'date': date.strftime('%Y-%m-%d'),
            'open_price': round(open_price, 2),
            'roi': round(roi, 2),
            'total_invested': formatted_total_invested,
            'total_net': formatted_total_net
        }

        investment_list.append(investment_object)
    investment_list.reverse()

    return jsonify(investment_list)

