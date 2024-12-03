// CONTINUE HERE
// next steps: 
// 1. init both Daos (they should not be in models?)
// 2. create model for badges? also for tasks? better?
// 3. check with copilot

const debug = require('debug')('todo:badgeDao');

class BadgeDao {
  constructor(cosmosClient, databaseId, containerId) {
    this.client = cosmosClient;
    this.databaseId = databaseId;
    this.containerId = containerId;
    this.database = null;
    this.container = null;
  }

  async init() {
    debug('Setting up the database...');
    const dbResponse = await this.client.databases.createIfNotExists({ id: this.databaseId });
    this.database = dbResponse.database;
    debug('Setting up the database...done!');
    debug('Setting up the container...');
    const coResponse = await this.database.containers.createIfNotExists({ id: this.containerId });
    this.container = coResponse.container;
    debug('Setting up the container...done!');
  }

  async createBadge(badge) {
    debug('Creating a badge definition in the database');
    const { resource: doc } = await this.container.items.create(badge);
    return doc;
  }

  async getBadgeById(badgeId) {
    debug('Getting a badge definition from the database');
    const querySpec = {
      query: "SELECT * FROM c WHERE c.id = @id AND c.type = 'badge_definition'",
      parameters: [{ name: "@id", value: badgeId }]
    };
    const { resources } = await this.container.items.query(querySpec).fetchAll();
    return resources[0];
  }

  async assignUserBadge(userBadge) {
    debug('Assigning a badge to a user');
    const { resource: doc } = await this.container.items.create(userBadge);
    return doc;
  }

  async getUserBadges(userPrincipalName) {
    debug('Querying for user badges from the database');
    const querySpec = {
      query: "SELECT * FROM c WHERE c.userPrincipalName = @userPrincipalName AND c.type = 'user_badge'",
      parameters: [{ name: "@userPrincipalName", value: userPrincipalName }]
    };
    const { resources } = await this.container.items.query(querySpec).fetchAll();
    return resources;
  }
}

module.exports = BadgeDao;
