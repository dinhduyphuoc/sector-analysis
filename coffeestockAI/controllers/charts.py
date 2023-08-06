from flask import Blueprint, request, jsonify
from services.charts import get_lstm_actual_and_test

chart_module = Blueprint("chart_module", __name__, url_prefix="/v1/prediction")


@chart_module.get("/chart")
def get_actual_and_test_chart():
    args = request.args
    tickersymbol = args["tickersymbol"]
    predict_range = int(args["predict_range"])

    actual_vs_test = get_lstm_actual_and_test(tickersymbol, predict_range)

    return jsonify(
        {
            "tickersymbol": tickersymbol,
            "actual": actual_vs_test[0],
            "test": actual_vs_test[1],
            "predict": actual_vs_test[2],
        }
    )


@chart_module.get("/test")
def test():
    return "Hello World"
