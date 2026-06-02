import { Sequelize, DataTypes } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'data', 'rotulweb.sqlite');

// Crear conexión a SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false
});

// Modelo InstagramLead
const InstagramLead = sequelize.define('InstagramLead', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  instagramUsername: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  instagramUserId: DataTypes.STRING,
  followerCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  followingCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isFollowing: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isFollower: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  profileUrl: DataTypes.STRING,
  profileImage: DataTypes.STRING,
  bio: DataTypes.TEXT,
  leadScore: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  leadSource: {
    type: DataTypes.STRING,
    defaultValue: 'manual',
    validate: {
      isIn: [['hashtag', 'location', 'competitor', 'manual', 'follower']]
    }
  },
  leadQuality: {
    type: DataTypes.STRING,
    defaultValue: 'cold',
    validate: {
      isIn: [['cold', 'warm', 'hot']]
    }
  },
  industry: DataTypes.STRING,
  lastInteractionDate: DataTypes.DATE,
  interactionCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  messagesSent: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  messageResponses: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  lastMessage: DataTypes.TEXT,
  lastMessageDate: DataTypes.DATE,
  convertedToClient: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  clientId: DataTypes.INTEGER,
  conversionDate: DataTypes.DATE,
  notes: DataTypes.TEXT,
  tags: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  reminderDate: DataTypes.DATE,
  reminderMessage: DataTypes.TEXT,
  status: {
    type: DataTypes.STRING,
    defaultValue: 'new',
    validate: {
      isIn: [['new', 'contacted', 'interested', 'quoted', 'converted', 'rejected', 'inactive']]
    }
  }
}, {
  timestamps: true
});

export { sequelize, InstagramLead };
