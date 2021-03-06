"""added recipient_has_seen bool to rooms

Revision ID: 3d4123ec58de
Revises: 6587eadc1ff8
Create Date: 2022-02-27 00:14:55.515384

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3d4123ec58de'
down_revision = '6587eadc1ff8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('rooms', sa.Column('recipient_has_seen', sa.Boolean(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('rooms', 'recipient_has_seen')
    # ### end Alembic commands ###
