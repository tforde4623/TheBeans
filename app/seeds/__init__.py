from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .categories import seed_categories, undo_categories
from .comments import seed_comments, undo_comments
from .likes import seed_likes, undo_likes

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# creates 'flask seed categories' command
@seed_commands.command('categories')
def seed_cats():
    seed_categories()

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    seed_users()
    seed_categories()
    seed_posts()
    seed_comments()
    seed_likes()
    # Add other seed functions here

# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    undo_users()
    undo_posts()
    undo_categories()
    undo_comments()
    undo_likes()
    # Add other undo functions here
