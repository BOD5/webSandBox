import pkg from 'sequelize';
import casual from 'casual';
import _ from 'lodash';
const { Sequelize } = pkg;

const sequelize = new Sequelize('test', 'root', '1234', {
	host: 'localhost',
	dialect: 'mysql'
});

const AuthorModel = sequelize.define('author', {
	id: {
		type: Sequelize.BIGINT,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	firstName: {type: Sequelize.STRING },
	lastName: {type: Sequelize.STRING },
// }, {
// 	underscored: true,
// 	timestamps: false,
// 	createdAt: false,
// 	paranoid: true
});

const PostModel = sequelize.define('post', {
	id: {
		type: Sequelize.BIGINT,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	title: {type: Sequelize.STRING },
	text: {type: Sequelize.STRING },
	authorId: {
		type: Sequelize.BIGINT,
		allowNull: false,
		references: {
			model: AuthorModel,
			key: 'id'
		}
	}
// }, {
// 	underscored: true,
// 	timestamps: false,
// 	createdAt: false,
// 	paranoid: true
});

AuthorModel.hasMany(PostModel, {
	foreignKey: 'authorId',
	sourceKey: 'id'
});
PostModel.belongsTo(AuthorModel, {
	foreignKey : 'authorId',
	targetKey: 'id'
});

sequelize.sync({ force: true }).then(() =>{
	// if (AuthorModel.findAll() == undefined) {
	_.times(3, () => {
		return AuthorModel.create({
			firstName: casual.first_name,
			lastName: casual.last_name
		}).then((author) => {
			_.times(3, () => {
				return PostModel.create({
					title: `A post by ${author.firstName}`,
					text: casual.sentences(3),
					authorId: author.id
				});
			});
		});
	});
	// }
});

const Author = sequelize.models.author;
const Post =  sequelize.models.post;

export { Author, Post };

export default sequelize;

// class User extends Model {}
// User.init({
// 	username: DataTypes.STRING,
// 	birthday: DataTypes.DATE
// }, { sequelize, modelName: 'user' });

// (async () => {
// 	await sequelize.sync();
// 	const jane = await User.create({
// 		username: 'janedoe',
// 		birthday: new Date(1980, 6, 20)
// 	});
// 	console.log(jane.toJSON());
// })();