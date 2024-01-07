from sqlalchemy import Column, Integer, String
from database import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base 

class Poems(Base):
    __tablename__ = "poems"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    alt = Column(String)
    description = Column(String)
    img = Column(String)
    tags= Column(String)
    url= Column(String)

class Songs(Base):
    __tablename__ = "songs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    src = Column(String)
    description = Column(String)
    subtitle = Column(String)
    tags= Column(String)
    lyrics= Column(String)
    

class Comments(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    userName = Column(String)
    content = Column(String)
    identifier = Column(String)


class Pages(Base):
    __tablename__ = "pages"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    subtitle = Column(String)
    content = Column(String)
    img = Column(String)
    alt= Column(String)
    url= Column(String)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String,  index=True)
    password = Column(String)
    email = Column(String, unique=True, index=True)
    # is_verified = Column(Integer, default=False)