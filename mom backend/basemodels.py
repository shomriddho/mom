from pydantic import BaseModel, Field
from pydantic import constr, validator
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

class UserCreate(BaseModel):
    username: str
    password: str
    email: str
    # is_verified: int = 0
    @validator("password")
    def validate_password(cls, v):
        # Add your stricter password validation criteria here
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if not any(char.isdigit() for char in v):
            raise ValueError("Password must contain at least one digit")
        if not any(char.isupper() for char in v):
            raise ValueError("Password must contain at least one uppercase letter")
        if not any(char.islower() for char in v):
            raise ValueError("Password must contain at least one lowercase letter")
        if not any(char in "!@#$%^&*()-_=+[]{};:,.<>?/~`" for char in v):
            raise ValueError("Password must contain at least one special character")
        return v
