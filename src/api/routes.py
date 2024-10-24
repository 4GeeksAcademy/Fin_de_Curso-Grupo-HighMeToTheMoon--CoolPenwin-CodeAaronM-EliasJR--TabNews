from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Category, UserCategory, Author, Newspaper, Article, Administrator
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, JWTManager
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import requests 




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

    hashed_password = request_body_user["password"]

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
        user.password = request_body_user["password"]

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

############# C.R.U.D USER CATEGORY ##############

@api.route('/user-category', methods=['GET'])
def get_user_categories():
    user_categories = UserCategory.query.all()
    results = list(map(lambda item: item.serialize(), user_categories))
    
    if not user_categories:
        return jsonify(message="No se han encontrado relaciones entre usuarios y categorías"), 404

    return jsonify(results), 200

@api.route('/user-category/<int:user_id>', methods=['GET'])
def get_user_categories_by_user(user_id):
    user_categories = UserCategory.query.filter_by(user_id=user_id).all()
    
    if not user_categories:
        return jsonify(message="No se han encontrado categorías para este usuario"), 404

    results = list(map(lambda item: item.serialize(), user_categories))
    return jsonify(results), 200

@api.route('/user-category', methods=['POST'])
@jwt_required()
def save_user_categories():
    user_id = get_jwt_identity()
    request_body = request.get_json()

    selected_categories = request_body.get('selectedCategories', [])
    
    if not selected_categories:
        # Si no hay categorías seleccionadas, elimina todas las preferencias del usuario
        UserCategory.query.filter_by(user_id=user_id).delete()
        db.session.commit()
        return jsonify({"msg": "All user categories removed successfully"}), 200

    # Obtén las categorías actuales del usuario
    current_categories = UserCategory.query.filter_by(user_id=user_id).all()
    current_category_ids = {cat.category_id for cat in current_categories}

    # Agregar nuevas categorías y eliminar las que ya no están seleccionadas
    for category_id in selected_categories:
        if category_id not in current_category_ids:
            new_user_category = UserCategory(user_id=user_id, category_id=category_id)
            db.session.add(new_user_category)

    # Eliminar categorías que ya no están seleccionadas
    for category_id in current_category_ids:
        if category_id not in selected_categories:
            UserCategory.query.filter_by(user_id=user_id, category_id=category_id).delete()

    db.session.commit()
    
    return jsonify({"msg": "User categories updated successfully"}), 200


@api.route('/user-category/<int:user_category_id>', methods=['DELETE'])
def delete_user_category(user_category_id):
    user_category = UserCategory.query.get(user_category_id)

    if not user_category:
        return jsonify({'message': "Relación no encontrada"}), 404

    db.session.delete(user_category)
    db.session.commit()

    return jsonify({'message': f'Relación con id {user_category_id} ha sido eliminada'}), 200


#--------------crud author----------------


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

    hashed_password = request_body_user["password"]

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
    if not user or not request_body_user["password"]:
        return jsonify({"error": "Correo o contraseña incorrectos"}), 401

    # Crear un token de acceso usando el ID del usuario
    access_token = create_access_token(identity=user.id)

    # Retornar el token de acceso
    return jsonify(access_token=access_token), 200

@api.route('/homePage', methods=['GET'])
@jwt_required()  # Solo los usuarios autenticados pueden acceder a esta vista
def homepage():
    return jsonify(message="Bienvenido a la página principal"), 200
# CRUD Newspaper ----------------------------------------

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
        return jsonify({'error': 'Logo is required'}), 400
    if 'link' not in body:
        return jsonify({'error': 'Link is required'}), 400
    
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
    if "link" in request_body_newspaper:
        newspaper.link = request_body_newspaper["link"]
        
        db.session.commit()

    return jsonify({'message': f'Usuario con id {newspaper_id} ha sido actualizado correctamente'}), 200

#---------------------------------Articles---------------------------



@api.route('/article', methods=['GET'])
def get_article():
    all_articles = Article.query.all()
    articles = list(map(lambda article: article.serialize(), all_articles))
    return jsonify(articles), 200

@api.route('/article/<int:article_id>', methods=['GET'])
def get_article_by_id(article_id):
    article = Article.query.filter_by(id=article_id).first()

    if article is None:
        return jsonify({"error": "article not found"}), 404

    return jsonify(article.serialize()), 200

@api.route('/article', methods=['POST'])
def post_article():
    body = request.get_json()

    if not body:
        return jsonify({'error': 'Request body must be JSON'}), 400

    article = Article(**body)
    try:
        db.session.add(article)
        db.session.commit()
        return jsonify({'message': 'Article created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api.route('/article/<int:article_id>', methods=['DELETE'])
def delete_article_by_id(article_id):
    article = Article.query.filter_by(id=article_id).first()

    if article is None:
        return jsonify({"error": "article not found"}), 404

    db.session.delete(article)
    db.session.commit()

    return jsonify(article.serialize()), 200

@api.route('/article/<int:article_id>', methods=['PUT'])
def update_article(article_id):
    request_body_article = request.get_json()  # Obtén los datos del cuerpo de la solicitud
    article = Article.query.get(article_id)
    
    if not article:
        return jsonify({'message': "article no encontrado"}), 404

    try:
        # Actualiza los campos del artículo con los valores del request
        if 'title' in request_body_article:
            article.title = request_body_article['title']
        if 'content' in request_body_article:
            article.content = request_body_article['content']
        if 'image' in request_body_article:
            article.image = request_body_article['image']
        if 'published_date' in request_body_article:
            article.published_date = request_body_article['published_date']
        if 'source' in request_body_article:
            article.source = request_body_article['source']
        if 'link' in request_body_article:
            article.link = request_body_article['link']
        if 'author_id' in request_body_article:
            article.author_id = request_body_article['author_id']
        if 'newspaper_id' in request_body_article:
            article.newspaper_id = request_body_article['newspaper_id']
        if 'category_id' in request_body_article:
            article.category_id = request_body_article['category_id']

        # Guarda los cambios en la base de datos
        db.session.commit()
        return jsonify({'message': f'article con id {article_id} ha sido actualizado correctamente'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


#----------------CRUD ADMIN------------


@api.route('/administrator', methods=['GET'])
def get_administrator():
    administrators = Administrator.query.all()
    resultados = list(map(lambda item: item.serialize(), administrators))

    if not administrators:
        return jsonify(message="No se han encontrado usuarios"), 404

    return jsonify(resultados), 200

@api.route('/administrator/<int:administrator_id>', methods=['GET'])
def get_administrator2(administrator_id):
    administrator = Administrator.query.get(administrator_id)

    if administrator is None:
        return jsonify(message="Usuario no encontrado"), 404

    return jsonify(administrator.serialize()), 200

@api.route('/administrator', methods=['POST'])
def add_new_administrator():
    request_body_administrator = request.get_json()

    if (
        "first_name" not in request_body_administrator
        or "last_name" not in request_body_administrator
        or "email" not in request_body_administrator
        or "password" not in request_body_administrator
    ):
        return jsonify({"error": "Datos incompletos"}), 400

    existing_administrator = Administrator.query.filter_by(email=request_body_administrator["email"]).first()
    if existing_administrator:
        return jsonify({"error": "El correo ya está registrado"}), 400

    hashed_password = bcrypt.generate_password_hash(request_body_administrator["password"]).decode('utf-8')

    new_administrator = Administrator(
        first_name=request_body_administrator["first_name"],
        last_name=request_body_administrator["last_name"],
        email=request_body_administrator["email"],
        password=hashed_password,
    )

    try:
        db.session.add(new_administrator)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

    response_body = {
        "msg": "Nuevo usuario añadido correctamente"
    }

    return jsonify(response_body), 201

@api.route('/administrator/<int:administrator_id>', methods=['PUT'])
def update_administrator(administrator_id):
    request_body_administrator = request.get_json()

    administrator = Administrator.query.get(administrator_id)
    
    if not administrator:
        return jsonify({'message': "Usuario no encontrado"}), 404

    if "first_name" in request_body_administrator:
        administrator.first_name = request_body_administrator["first_name"]
    if "last_name" in request_body_administrator:
        administrator.last_name = request_body_administrator["last_name"]
    if "email" in request_body_administrator:
        existing_administrator = Administrator.query.filter_by(email=request_body_administrator["email"]).first()
        if existing_administrator and existing_administrator.id != administrator_id:
            return jsonify({"error": "El correo ya está en uso por otro usuario"}), 400
        administrator.email = request_body_administrator["email"]
    if "password" in request_body_administrator:
        administrator.password = bcrypt.generate_password_hash(request_body_administrator["password"]).decode('utf-8')

    db.session.commit()

    return jsonify({'message': f'Usuario con id {administrator_id} ha sido actualizado correctamente'}), 200

@api.route('/administrator/<int:administrator_id>', methods=['DELETE'])
def delete_administrator(administrator_id):
    administrator = Administrator.query.get(administrator_id)

    if not administrator:
        return jsonify({'message': "Usuario no encontrado"}), 404

    db.session.delete(administrator)
    db.session.commit()

    return jsonify({'message': f'Usuario con id {administrator_id} ha sido borrado'}), 200

#-----------------ADMIN LOGIN*SIGNUP-------------


@api.route('/administratorSignup', methods=['POST'])
def administratorSignup():
    request_body_administrator = request.get_json()

    if (
        "first_name" not in request_body_administrator
        or "last_name" not in request_body_administrator
        or "email" not in request_body_administrator
        or "password" not in request_body_administrator
    ):
        return jsonify({"error": "Datos incompletos"}), 400

    existing_administrator = Administrator.query.filter_by(email=request_body_administrator["email"]).first()
    if existing_administrator:
        return jsonify({"error": "El correo ya está registrado"}), 400

    hashed_password = bcrypt.generate_password_hash(request_body_administrator["password"]).decode('utf-8')

    new_administrator = Administrator(
        first_name=request_body_administrator["first_name"],
        last_name=request_body_administrator["last_name"],
        email=request_body_administrator["email"],
        password=hashed_password,
    )

    try:
        db.session.add(new_administrator)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

    response_body = {
        "msg": "Nuevo usuario añadido correctamente"
    }

    return jsonify(response_body), 201

@api.route('/administratorLogin', methods=['POST'])
def administratorLogin():
    # Obtener el cuerpo de la solicitud JSON
    request_body_administrator = request.get_json()

    if "email" not in request_body_administrator or "password" not in request_body_administrator:
        return jsonify({"error": "Correo y contraseña son requeridos"}), 400

    # Consultar el usuario en la base de datos usando el correo electrónico
    administrator = Administrator.query.filter_by(email=request_body_administrator["email"]).first()

    # Verificar que el usuario existe y que la contraseña sea correcta
    if not administrator or not bcrypt.check_password_hash(administrator.password, request_body_administrator["password"]):
        return jsonify({"error": "Correo o contraseña incorrectos"}), 401

    # Crear un token de acceso usando el ID del usuario
    access_token = create_access_token(identity=administrator.id)

    # Retornar el token de acceso
    return jsonify(access_token=access_token), 200

@api.route('/administratorHomePage', methods=['GET'])
@jwt_required()  # Solo los usuarios autenticados pueden acceder a esta vista
def administratorhomepage():
    return jsonify(message="Bienvenido a la página principal"), 200

@api.route('/getApiArticle', methods=['GET'])
def get_Api_Article():
    try:
        response = requests.get('https://newsapi.org/v2/top-headlines', params={
            'country': 'us',
            'apiKey': '7f63a0e6ff1545ee985b734fad2d06aa' 
        })

        if response.status_code != 200:
            return jsonify({'error': 'Error al obtener datos de la API externa'}), 500

        data = response.json()

        # Establecer valores predeterminados para la imagen y la descripción
        default_image = "https://t3.ftcdn.net/jpg/03/49/45/70/360_F_349457036_XWvovNpNk79ftVg4cIpBhJurdihVoJ2B.jpg"  # URL de imagen por defecto
        default_description = "Descripción no disponible en este momento."  # Descripción por defecto

        for article in data.get('articles', []):
            title = article.get('title')
            description = article.get('description') or default_description  # Asignar descripción por defecto
            url_to_image = article.get('urlToImage') or default_image  # Asignar imagen por defecto
            published_at = article.get('publishedAt')
            url = article.get('url')
            author_name = article.get('author')
            source_name = article.get('source', {}).get('name')

            # Validar que los campos críticos no sean None
            if not all([title, url, author_name, source_name, published_at]):
                print(f"Artículo ignorado por falta de datos: {article}")
                continue

            # Limitar los campos a la longitud máxima aceptada por la base de datos
            title = title[:255]
            description = description[:65535]
            url_to_image = url_to_image[:255]
            url = url[:255]
            author_name = author_name[:100]
            source_name = source_name[:255]

            # Verificar si el artículo ya existe en la base de datos (por título y URL)
            existing_article = Article.query.filter_by(title=title, source=url).first()
            if existing_article:
                continue  # Saltar si el artículo ya existe

            # Verificar si el autor ya existe en la base de datos
            author = Author.query.filter_by(name=author_name).first()
            if not author:
                author = Author(name=author_name, description=None, photo=None)
                db.session.add(author)
                db.session.flush()

            # Verificar si el periódico ya existe en la base de datos
            newspaper = Newspaper.query.filter_by(name=source_name).first()
            if not newspaper:
                newspaper = Newspaper(name=source_name)
                db.session.add(newspaper)
                db.session.flush()

            # Crear el nuevo artículo
            new_article = Article(
                title=title,
                content=description,
                image=url_to_image,
                published_date=published_at,
                source=url,
                link=url,
                author_id=author.id,
                newspaper_id=newspaper.id,
                category_id=1
            )

            db.session.add(new_article)

        db.session.commit()
        return jsonify(message="Artículos creados exitosamente"), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Error al procesar la solicitud: ' + str(e)}), 500


@api.route('/article/<int:article_id>/category', methods=['PUT'])
def update_article_category(article_id):
    request_body = request.get_json()

    if not request_body or 'category_id' not in request_body:
        return jsonify({'error': 'Category ID is required'}), 400

    category_id = request_body['category_id']
    article = Article.query.get(article_id)

    if not article:
        return jsonify({'error': 'Article not found'}), 404

    try:
        article.category_id = category_id  # Actualiza la categoría del artículo
        db.session.commit()  # Guarda los cambios en la base de datos
        return jsonify({'message': f'Article with ID {article_id} updated with new category ID {category_id}'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500






