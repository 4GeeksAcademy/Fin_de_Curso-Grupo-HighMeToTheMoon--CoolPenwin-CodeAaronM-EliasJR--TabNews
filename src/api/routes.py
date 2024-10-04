"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Newspaper      
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    # Obtener los datos del cuerpo de la solicitud
    request_body_user = request.get_json()

    # Buscar el usuario en la base de datos
    user = User.query.get(user_id)

    if not user:
        return jsonify({'message': "Usuario no encontrado"}), 404

    # Actualizar los campos solo si están presentes en la solicitud
    if "first_name" in request_body_user:
        user.first_name = request_body_user["first_name"]
    if "last_name" in request_body_user:
        user.last_name = request_body_user["last_name"]
    if "email" in request_body_user:
        # Verificar si el nuevo email ya existe en otro usuario
        existing_user = User.query.filter_by(email=request_body_user["email"]).first()
        if existing_user and existing_user.id != user_id:
            return jsonify({"error": "El correo ya está en uso por otro usuario"}), 400
        user.email = request_body_user["email"]
    if "password" in request_body_user:
        user.password = request_body_user["password"]  # Recuerda encriptar la contraseña

    # Guardar los cambios en la base de datos
    db.session.commit()

    return jsonify({'message': f'Usuario con id {user_id} ha sido actualizado correctamente'}), 200




@api.route('/newspaper', methods=['GET'])
def get_newspaper():
    all_newspapers = Newspaper.query.all()
    newspapers = list(map(lambda character: character.serialize(),all_newspapers))
    return jsonify(newspapers), 200

@api.route('/newspaper/<int:newspaper_id>', methods=['GET'])
def get_newspaper_by_id(newspaper_id):
    newspaper = Newspaper.query.filter_by(id=newspaper_id).first()

    if newspaper is None:
        return jsonify({"error": "newspaper not found"}), 404

    return jsonify(newspaper.serialize()), 200

@api.route('/newspaper', methods=['POST'])
def post_newspaper():
    body = request.get_json()

    if not body:
        return jsonify({'error': 'Request body must be JSON'}), 400

    if 'name' not in body:
        return jsonify({'error': 'Name is required'}), 400
    if 'description' not in body:
        return jsonify({'error': 'Description is required'}), 400
    if 'photo' not in body:
        return jsonify({'error': 'Photo is required'}), 400
    
    if body['name'] == '':
        return jsonify({'error': 'Name cannot be empty'}), 400
    
    newspaper = Newspaper(**body)
    try:
        db.session.add(newspaper)
        db.session.commit()
        return jsonify({'message': 'Newspaper created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@api.route('/newspaper/<int:newspaper_id>', methods=['DELETE'])
def delete_newspaper_by_id(newspaper_id):
    newspaper = Newspaper.query.filter_by(id=newspaper_id).first()

    if newspaper is None:
        return jsonify({"error": "newspaper not found"}), 404
    
    db.session.delete(newspaper)
    db.session.commit()

    return jsonify(newspaper.serialize()), 200

@api.route('/newspaper/<int:newspaper_id>', methods=['PUT'])
def update_newspaper(newspaper_id):
    request_body_newspaper = request.get_json()

    newspaper = Newspaper.query.get(newspaper_id)

    if not newspaper:
        return jsonify({'message': "Usuario no encontrado"}), 404

    if "name" in request_body_newspaper:
        newspaper.name = request_body_newspaper["name"]
    if "description" in request_body_newspaper:
        newspaper.description = request_body_newspaper["description"]
    if "photo" in request_body_newspaper:
        newspaper.photo = request_body_newspaper["photo"]
        
        db.session.commit()

    return jsonify({'message': f'Usuario con id {newspaper_id} ha sido actualizado correctamente'}), 200