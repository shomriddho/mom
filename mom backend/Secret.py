from passlib.context import CryptContext

# JWT configuration
SECRET_KEY = "&|bG%<Eieb&gRzhwumWRh}='OX4F?b{`<V%BDb;,rnv[N*J3E\:`7sO?CcVM\>ia\QWIO>b<~bPI.f!EkF7j!X;$N*t][S.Ao`M6lc(rJv:tqNQ&c2tF,=_z~-|"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 5678

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
