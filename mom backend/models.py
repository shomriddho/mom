from sqlalchemy import Column, Integer, String
from database import Base


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
    __tablename__ = "poem_pages"

    id = Column(Integer, primary_key=True, index=True)
    userName = Column(String)
    content = Column(String)
    identifier = Column(String)