from flask import Blueprint
from services.models import build_all_models

model_module = Blueprint('model_module', __name__, url_prefix='/v1/prediction')

@model_module.get('/model')
def init():
    build_all_models()
    return "Done"