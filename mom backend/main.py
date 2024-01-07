from imports import *

app = FastAPI()
origin = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
)
models.Base.metadata.create_all(bind=engine)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


# main code
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

    poem_model = models.Poems()
    poem_model.title = poem.title
    poem_model.alt = poem.alt
    poem_model.description = poem.description
    poem_model.img = poem.img
    poem_model.tags = poem.tags
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

    song_model = models.Songs()
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


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        return username
    except JWTError:
        raise credentials_exception


def authenticate_user(db, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if not user or not pwd_context.verify(password, user.password):
        return False
    return user


@app.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    db = SessionLocal()
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/protected")
def protected_route(current_user: str = Depends(verify_token)):
    return {"message": "You are authenticated", "username": current_user}


@app.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    hashed_password = pwd_context.hash(user.password)
    new_user = User(username=user.username, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully"}
