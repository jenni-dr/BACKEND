CREATE TABLE IF NOT EXISTS SPORTMUSIC_USER (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    nickname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    
);


CREATE TABLE SPORTMUSIC_GENRE (
	music_id VARCHAR(255) GENRE ENUM ( 
    'AXÉ',
    'BLUES',
    'COUNTRY',
    'FORRÓ',
    'ELETRÔNICA',
    'GOSPEL',
    'JAZZ',
    'MPB',
    'PAGODE',
    'POP',
    'KPOP',
    'ROCK',
    'SERTANEJO',
    'FUNK',
    ),
     PRIMARY KEY (music_id, genre),
   FOREIGN KEY (music_id) REFERENCES SPORTMUSIC_MUSICS (id)
);
    

CREATE TABLE IF NOT EXIST SPORTMUSIC_MUSICS (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL ,
    date DATE NOT NULL,
    file VARCHAR(255) NOT NULL,
    genre VARCHAR(255) NOT NULL,
    album VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES SPORTMUSIC_USER(id)
);
