import React, { ChangeEvent } from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { INotification } from '../../types';
import FormWrapper from './FormWrapper';
import { NotificationContext } from '../Context/NotificationContext';
import NotificationForm from './NotificationForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  })
);

interface IProps {
  notification: INotification;
  index: number;
  expanded: number | boolean;
  handleChange: (
    arg: number
  ) => ((event: ChangeEvent<{}>, expanded: boolean) => void) | undefined;
}
const NotificationCard: React.FC<IProps> = ({
  notification,
  index,
  expanded,
  handleChange,
}) => {
  const { message, productId, id } = notification;
  const classes = useStyles();

  return (
    <FormWrapper notification={notification} productId={productId}>
      {({ formBag }) => {
        return (
          <NotificationContext.Provider value={{ formBag }}>
            <Accordion
              expanded={expanded === index}
              onChange={handleChange(index)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1bh-content'
                id='panel1bh-header'
              >
                <Typography className={classes.heading}>
                  MESSAGE#{id}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {message.length > 34
                    ? `${message.substring(0, 34)}...`
                    : message}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <NotificationForm formBag={formBag} />
              </AccordionDetails>
            </Accordion>
          </NotificationContext.Provider>
        );
      }}
    </FormWrapper>
  );
};

export default NotificationCard;
