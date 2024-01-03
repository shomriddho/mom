from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


class Poem(BaseModel):
    title: str = Field(min_length=1)
    alt: str = Field(min_length=1, max_length=100)
    description: str = Field(min_length=1, max_length=10000)
    img: str = Field(min_length=1, max_length=1000)
    tags: str = Field(min_length=1, max_length=1000)
    url: str = Field(min_length=1, max_length=1000)


class Songs(BaseModel):
    title: str = Field(min_length=1)
    src: str = Field(min_length=1)
    description: str = Field(min_length=1)
    subtitle: str = Field(min_length=1)
    tags: str = Field(min_length=1)
    lyrics: str = Field(min_length=1)


class Comments(BaseModel):
    userName: str = Field(min_length=1)
    content: str = Field(min_length=1)
    identifier: str = Field(min_length=1)


class Pages(BaseModel):
    title: str = Field(min_length=1)
    subtitle: str = Field(min_length=1)
    content: str = Field(min_length=1)
    img: str = Field(min_length=1)
    alt: str = Field(min_length=1)
    url: str = Field(min_length=1)


@app.get("/poems")
def read_api(db: Session = Depends(get_db)):
    return db.query(models.Poems).all()


@app.post("/poems")
def create_poem(poem: Poem, db: Session = Depends(get_db)):

    poem_model = models.Poems()
    poem_model.title = poem.title
    poem_model.alt = poem.alt
    poem_model.description = poem.description
    poem_model.img = poem.img
    poem_model.tags = poem.tags
    poem_model.url = poem.url

    db.add(poem_model)
    db.commit()

    return poem


@app.put("/poems/{poem_id}")
def update_poem(poem_id: int, poem: Poem, db: Session = Depends(get_db)):

    poem_model = db.query(models.Poems).filter(models.Poems.id == poem_id).first()

    if poem_model is None:
        raise HTTPException(status_code=404, detail=f"ID {poem_id} : Does not exist")

    poem_model.title = poem.title
    poem_model.alt = poem.alt
    poem_model.description = poem.description
    poem_model.img = poem.img
    poem_model.url = poem.url

    db.commit()

    return poem


@app.delete("/poems/{poem_id}")
def delete_poem(poem_id: int, db: Session = Depends(get_db)):

    poem_model = db.query(models.Poems).filter(models.Poems.id == poem_id).first()

    if poem_model is None:
        raise HTTPException(status_code=404, detail=f"ID {poem_id} : Does not exist")

    db.query(models.Poems).filter(models.Poems.id == poem_id).delete()

    db.commit()


@app.get("/songs")
def read_songs(db: Session = Depends(get_db)):
    return db.query(models.Songs).all()


@app.post("/songs")
def create_song(song: Songs, db: Session = Depends(get_db)):

    song_model = models.Songs()
    song_model.title = song.title  # Corrected assignment
    song_model.src = song.src
    song_model.description = song.description
    song_model.subtitle = song.subtitle
    song_model.tags = song.tags
    song_model.lyrics = song.lyrics

    db.add(song_model)
    db.commit()

    return song


@app.put("/songs/{song_id}")
def update_song(song_id: int, song: Songs, db: Session = Depends(get_db)):

    song_model = db.query(models.Songs).filter(models.Songs.id == song_id).first()

    if song_model is None:
        raise HTTPException(status_code=404, detail=f"ID {song_id} : Does not exist")

    song_model.title = song.title  # Corrected assignment
    song_model.src = song.src
    song_model.description = song.description
    song_model.subtitle = song.subtitle
    song_model.tags = song.tags
    song_model.lyrics = song.lyrics

    db.commit()

    return song


@app.delete("/songs/{song_id}")
def delete_song(song_id: int, db: Session = Depends(get_db)):

    song_model = db.query(models.Songs).filter(models.Songs.id == song_id).first()

    if song_model is None:
        raise HTTPException(status_code=404, detail=f"ID {song_id} : Does not exist")

    db.delete(song_model)  # Changed to delete the song_model
    db.commit()


@app.get("/comments")
def read_pages(db: Session = Depends(get_db)):
    return db.query(models.Comments).all()


@app.post("/comments")
def create_page(page: Comments, db: Session = Depends(get_db)):

    page_model = models.Comments()
    page_model.userName = page.userName  # Corrected assignment
    page_model.content = page.content
    page_model.identifier = page.identifier

    db.add(page_model)
    db.commit()

    return page


@app.put("/comment/{comment_id}")
def update_page(page_id: int, page: Comments, db: Session = Depends(get_db)):

    page_model = db.query(models.Comments).filter(models.P.id == page_id).first()

    if page_model is None:
        raise HTTPException(status_code=404, detail=f"ID {page_id} : Does not exist")

    db.commit()

    return page


@app.delete("/comment/{comment_id}")
def delete_page(page_id: int, db: Session = Depends(get_db)):

    page_model = db.query(models.Comments).filter(models.Comments.id == page_id).first()

    if page_model is None:
        raise HTTPException(status_code=404, detail=f"ID {page_id} : Does not exist")

    db.delete(page_model)  # Changed to delete the page_model
    db.commit()


@app.get("/pages")
def read_pages(db: Session = Depends(get_db)):
    return db.query(models.Pages).all()


@app.post("/pages")
def create_page(page: Pages, db: Session = Depends(get_db)):

    page_model = models.Pages()
    page_model.title = page.title  # Corrected assignment
    page_model.subtitle = page.subtitle
    page_model.content = page.content
    page_model.img = page.img
    page_model.alt = page.alt
    page_model.url = page.url

    db.add(page_model)
    db.commit()

    return page
