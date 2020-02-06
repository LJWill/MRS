import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import tileData from './tileData';

import m1 from '../../assets/images/m1.png';
import m2 from '../../assets/images/m2.png';
import m3 from '../../assets/images/m3.png';
import m4 from '../../assets/images/m4.png';
import m5 from '../../assets/images/m5.png';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
}));


export default function SingleLineGridList() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridList
        className={classes.gridList}
        cols={5}
        cellHeight={200}
        spacing={5}
      >
        {tileData.map(tile => (
          <GridListTile
            key={tile.author}
            cols={1.2}
            rows={1.2}
            onClick={() => {
              window.location.href=`/movie/${tile.id}`
            }}
          >
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title
              }}
              actionIcon={
                <IconButton aria-label={`star ${tile.title}`}>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
