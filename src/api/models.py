from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)


    # interests = db.relationship('InterestUser', back_populates='user')

    def __repr__(self):
        return f"<User {self.first_name} {self.last_name}, Email: {self.email}>"

    def serialize(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
        }

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)

    # articles = db.relationship('Article', secondary='article_category', back_populates='categories')

    def __repr__(self):
        return f"<Category {self.name}>"

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }
class Author(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    photo = db.Column(db.String(255))

    # articles = db.relationship('Article', back_populates='author')

    def repr(self):
        return f"<Author {self.name}>"

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'photo': self.photo
        }
    
class Newspaper(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    logo = db.Column(db.String(255))
    link = db.Column(db.String(255))

    # articles = db.relationship('Article', back_populates='newspaper')

    def repr(self):
        return f"<Newspaper {self.name}>"

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'logo': self.logo,
            'link': self.link
        }