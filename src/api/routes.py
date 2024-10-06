from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Category, Author
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, JWTManager
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required




# Inicializa bcrypt sin pasar el Blueprint
bcrypt = Bcrypt()

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
    request_body_user = request.get_json()

    if (
        "first_name" not in request_body_user
        or "last_name" not in request_body_user
        or "email" not in request_body_user
        or "password" not in request_body_user
    ):
        return jsonify({"error": "Datos incompletos"}), 400

    existing_user = User.query.filter_by(email=request_body_user["email"]).first()
    if existing_user:
        return jsonify({"error": "El correo ya está registrado"}), 400

    hashed_password = bcrypt.generate_password_hash(request_body_user["password"]).decode('utf-8')

    new_user = User(
        first_name=request_body_user["first_name"],
        last_name=request_body_user["last_name"],
        email=request_body_user["email"],
        password=hashed_password,
    )

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

    response_body = {
        "msg": "Nuevo usuario añadido correctamente"
    }

    return jsonify(response_body), 201

@api.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    request_body_user = request.get_json()

    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'message': "Usuario no encontrado"}), 404

    if "first_name" in request_body_user:
        user.first_name = request_body_user["first_name"]
    if "last_name" in request_body_user:
        user.last_name = request_body_user["last_name"]
    if "email" in request_body_user:
        existing_user = User.query.filter_by(email=request_body_user["email"]).first()
        if existing_user and existing_user.id != user_id:
            return jsonify({"error": "El correo ya está en uso por otro usuario"}), 400
        user.email = request_body_user["email"]
    if "password" in request_body_user:
        user.password = bcrypt.generate_password_hash(request_body_user["password"]).decode('utf-8')

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
    request_body_category = request.get_json()

    if "name" not in request_body_category:
        return jsonify({"error": "El nombre de la categoría es obligatorio"}), 400

    new_category = Category(
        name=request_body_category["name"],
        description=request_body_category.get("description", None)
    )

    db.session.add(new_category)
    db.session.commit()

    response_body = {
        "msg": "Nueva categoría añadida correctamente"
    }

    return jsonify(response_body), 201

@api.route('/category/<int:category_id>', methods=['PUT'])
def update_category(category_id):
    request_body_category = request.get_json()

    category = Category.query.get(category_id)
    
    if not category:
        return jsonify({'message': "Categoría no encontrada"}), 404

    if "name" in request_body_category:
        category.name = request_body_category["name"]
    if "description" in request_body_category:
        category.description = request_body_category["description"]

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

############# C.R.U.D AUTHOR ##############

@api.route('/author', methods=['GET'])
def get_author():
    all_authors = Author.query.all()
    authors = list(map(lambda character: character.serialize(), all_authors))
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
        return jsonify({'message': "Autor no encontrado"}), 404

    if "name" in request_body_author:
        author.name = request_body_author["name"]
    if "description" in request_body_author:
        author.description = request_body_author["description"]
    if "photo" in request_body_author:
        author.photo = request_body_author["photo"]

    db.session.commit()

    return jsonify({'message': f'Autor con id {author_id} ha sido actualizado correctamente'}), 200

############# LOGIN/SIGNUP ##############

@api.route('/signup', methods=['POST'])
def signup():
    request_body_user = request.get_json()

    if (
        "first_name" not in request_body_user
        or "last_name" not in request_body_user
        or "email" not in request_body_user
        or "password" not in request_body_user
    ):
        return jsonify({"error": "Datos incompletos"}), 400

    existing_user = User.query.filter_by(email=request_body_user["email"]).first()
    if existing_user:
        return jsonify({"error": "El correo ya está registrado"}), 400

    hashed_password = bcrypt.generate_password_hash(request_body_user["password"]).decode('utf-8')

    new_user = User(
        first_name=request_body_user["first_name"],
        last_name=request_body_user["last_name"],
        email=request_body_user["email"],
        password=hashed_password,
    )

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

    response_body = {
        "msg": "Nuevo usuario añadido correctamente"
    }

    return jsonify(response_body), 201

@api.route('/login', methods=['POST'])
def login():
    # Obtener el cuerpo de la solicitud JSON
    request_body_user = request.get_json()

    if "email" not in request_body_user or "password" not in request_body_user:
        return jsonify({"error": "Correo y contraseña son requeridos"}), 400

    # Consultar el usuario en la base de datos usando el correo electrónico
    user = User.query.filter_by(email=request_body_user["email"]).first()

    # Verificar que el usuario existe y que la contraseña sea correcta
    if not user or not bcrypt.check_password_hash(user.password, request_body_user["password"]):
        return jsonify({"error": "Correo o contraseña incorrectos"}), 401

    # Crear un token de acceso usando el ID del usuario
    access_token = create_access_token(identity=user.id)

    # Retornar el token de acceso
    return jsonify(access_token=access_token), 200

@api.route('/homePage', methods=['GET'])
@jwt_required()  # Solo los usuarios autenticados pueden acceder a esta vista
def homepage():
    return jsonify(message="Bienvenido a la página principal"), 200
