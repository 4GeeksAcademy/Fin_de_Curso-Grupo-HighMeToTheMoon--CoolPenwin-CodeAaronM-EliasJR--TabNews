"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Category, Author, Newspaper
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


############# C.R.U.D USER ##############

@api.route('/user', methods=['GET'])
def get_user():
    users = User.query.all()
    resultados = list(map(lambda item: item.serialize(), users))
    
    if not users:
        return jsonify(message="No se han encontrado usuarios"), 404

    return jsonify(resultados), 200

@api.route('/user/<int:user_id>', methods=['GET'])
def get_user2(user_id):
    user = User.query.get(user_id)  

    if user is None:
        return jsonify(message="Usuario no encontrado"), 404

    return jsonify(user.serialize()), 200

@api.route('/user', methods=['POST'])
def add_new_user():
    # Obtener los datos del cuerpo de la solicitud
    request_body_user = request.get_json()

    # Verificar que todos los campos necesarios estén presentes
    if (
        "first_name" not in request_body_user
        or "last_name" not in request_body_user
        or "email" not in request_body_user
        or "password" not in request_body_user
    ):
        return jsonify({"error": "Datos incompletos"}), 400

    # Verificar si el email ya existe
    existing_user = User.query.filter_by(email=request_body_user["email"]).first()
    if existing_user:
        return jsonify({"error": "El correo ya está registrado"}), 400

    # Crear un nuevo usuario
    new_user = User(
        first_name=request_body_user["first_name"],
        last_name=request_body_user["last_name"],
        email=request_body_user["email"],
        password=request_body_user["password"],  # Recuerda encriptar la contraseña en un escenario real
    )

    # Guardar el nuevo usuario en la base de datos
    db.session.add(new_user)
    db.session.commit()

    # Responder con un mensaje de éxito
    response_body = {
        "msg": "Nuevo usuario añadido correctamente"
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


@api.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({'message': "Usuario no encontrado"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': f'Usuario con id {user_id} ha sido borrado'}), 200


############# C.R.U.D CATEGORY ##############

@api.route('/category', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    resultados = list(map(lambda item: item.serialize(), categories))
    
    if not categories:
        return jsonify(message="No se han encontrado categorías"), 404

    return jsonify(resultados), 200


@api.route('/category/<int:category_id>', methods=['GET'])
def get_category(category_id):
    category = Category.query.get(category_id)  

    if category is None:
        return jsonify(message="Categoría no encontrada"), 404

    return jsonify(category.serialize()), 200


@api.route('/category', methods=['POST'])
def add_new_category():
    # Obtener los datos del cuerpo de la solicitud
    request_body_category = request.get_json()

    # Verificar que el campo "name" esté presente
    if "name" not in request_body_category:
        return jsonify({"error": "El nombre de la categoría es obligatorio"}), 400

    # Crear una nueva categoría
    new_category = Category(
        name=request_body_category["name"],
        description=request_body_category.get("description", None)  # Campo opcional
    )

    # Guardar la nueva categoría en la base de datos
    db.session.add(new_category)
    db.session.commit()

    # Responder con un mensaje de éxito
    response_body = {
        "msg": "Nueva categoría añadida correctamente"
    }

    return jsonify(response_body), 200


@api.route('/category/<int:category_id>', methods=['PUT'])
def update_category(category_id):
    # Obtener los datos del cuerpo de la solicitud
    request_body_category = request.get_json()

    # Buscar la categoría en la base de datos
    category = Category.query.get(category_id)
    
    if not category:
        return jsonify({'message': "Categoría no encontrada"}), 404

    # Actualizar los campos solo si están presentes en la solicitud
    if "name" in request_body_category:
        category.name = request_body_category["name"]
    if "description" in request_body_category:
        category.description = request_body_category["description"]

    # Guardar los cambios en la base de datos
    db.session.commit()

    return jsonify({'message': f'Categoría con id {category_id} ha sido actualizada correctamente'}), 200


@api.route('/category/<int:category_id>', methods=['DELETE'])
def delete_category(category_id):
    category = Category.query.get(category_id)

    if not category:
        return jsonify({'message': "Categoría no encontrada"}), 404

    db.session.delete(category)
    db.session.commit()

    return jsonify({'message': f'Categoría con id {category_id} ha sido borrada'}), 200

#--------------crud author----------------


@api.route('/author', methods=['GET'])
def get_author():
    all_authors = Author.query.all()
    authors = list(map(lambda character: character.serialize(),all_authors))
    return jsonify(authors), 200

@api.route('/author/<int:author_id>', methods=['GET'])
def get_author_by_id(author_id):
    author = Author.query.filter_by(id=author_id).first()

    if author is None:
        return jsonify({"error": "author not found"}), 404

    return jsonify(author.serialize()), 200

@api.route('/author', methods=['POST'])
def post_author():
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
    
    author = Author(**body)
    try:
        db.session.add(author)
        db.session.commit()
        return jsonify({'message': 'Author created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@api.route('/author/<int:author_id>', methods=['DELETE'])
def delete_author_by_id(author_id):
    author = Author.query.filter_by(id=author_id).first()

    if author is None:
        return jsonify({"error": "author not found"}), 404
    
    db.session.delete(author)
    db.session.commit()

    return jsonify(author.serialize()), 200

@api.route('/author/<int:author_id>', methods=['PUT'])
def update_author(author_id):
    request_body_author = request.get_json()

    author = Author.query.get(author_id)

    if not author:
        return jsonify({'message': "Usuario no encontrado"}), 404

    if "name" in request_body_author:
        author.name = request_body_author["name"]
    if "description" in request_body_author:
        author.description = request_body_author["description"]
    if "photo" in request_body_author:
        author.photo = request_body_author["photo"]
        
        db.session.commit()

    return jsonify({'message': f'Usuario con id {author_id} ha sido actualizado correctamente'}), 200


# CRUD Newspaper

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
    if 'logo' not in body:
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
    if "logo" in request_body_newspaper:
        newspaper.logo = request_body_newspaper["logo"]
        
        db.session.commit()

    return jsonify({'message': f'Usuario con id {newspaper_id} ha sido actualizado correctamente'}), 200