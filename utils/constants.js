// Errors code
const BAD_REQUEST_ERROR_CODE = 400;
const CONFLICT_REQUEST_ERROR_CODE = 409;
const FORBIDDEN_ERROR_CODE = 403;
const NOT_FOUND_ERROR_CODE = 404;
const UNAUTHORIZED_ERROR_CODE = 401;

// Errors User
const INCORRECT_DATA_USER_CREATE_ERROR = 'Переданы некорректные данные при создании пользователя.';
const USER_ALREADY_EXISTS_ERROR = 'Такой пользователь уже существует.';
const INCORRECT_DATA_USER_UPDATE_ERROR = 'Переданы некорректные данные при обновлении профиля.';
const NOT_USER_BY_ID_ERROR = 'Пользователь с указанным _id не найден.';

// Errors Movie
const INCORRECT_DATA_MOVIE_CREATE_ERROR = 'Переданы некорректные данные при создании фильма.';
const NOT_MOVIE_BY_ID_ERROR = 'Фильм с указанным _id не найден.';
const INCORRECT_DATA_MOVIE_DELETE_ERROR = 'Некорректный запрос удаления фильма';
const NOT_ACCESS_RIGHTS_MOVIE_DELETE_ERROR = 'Нельзя удалять чужие фильмы! :/';

// Errors userSchema
const INCORRECT_EMAIL_PASSWORD_ERROR = 'Неправильная почта или пароль.';
const INCORRECT_EMAIL_ERROR = 'Некорректная электронная почта';

// Errors movieSchema
const INCORRECT_LINK_MOVIE_POSTER = 'Некорректная ссылка на постер к фильму';
const INCORRECT_LINK_MOVIE_TRAILER = 'Некорректная ссылка на трейлер фильма';
const INCORRECT_LINK_MOVIE_IMAGE = 'Некорректная ссылка на изображение постера к фильму';

// Errors
const PAGE_NOT_FOUND_ERROR = 'Запрашиваемая страница не найдена :(';
const UNAUTHORIZED_ERROR = 'Необходима авторизация!';

module.exports = {
  BAD_REQUEST_ERROR_CODE,
  CONFLICT_REQUEST_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  INCORRECT_DATA_USER_CREATE_ERROR,
  USER_ALREADY_EXISTS_ERROR,
  INCORRECT_DATA_USER_UPDATE_ERROR,
  NOT_USER_BY_ID_ERROR,
  INCORRECT_DATA_MOVIE_CREATE_ERROR,
  NOT_MOVIE_BY_ID_ERROR,
  INCORRECT_DATA_MOVIE_DELETE_ERROR,
  NOT_ACCESS_RIGHTS_MOVIE_DELETE_ERROR,
  PAGE_NOT_FOUND_ERROR,
  INCORRECT_EMAIL_PASSWORD_ERROR,
  UNAUTHORIZED_ERROR,
  INCORRECT_EMAIL_ERROR,
  INCORRECT_LINK_MOVIE_POSTER,
  INCORRECT_LINK_MOVIE_TRAILER,
  INCORRECT_LINK_MOVIE_IMAGE,
};
