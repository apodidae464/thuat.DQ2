var prjLocation = 'D:/_MyApps/_Desktop/NoteJS/thuat.DQ2';
var moongoesURL = 'mongodb://localhost/myDataBase';

const port = process.env.PORT || 1500;

exports.localHost = port;

exports.mainMenu = '/';
exports.login = '/login';
exports.regis = '/regis';
exports.home = '/home';
exports.htmlPath = prjLocation;
exports.dbURL = moongoesURL;