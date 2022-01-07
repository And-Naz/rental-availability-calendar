import {memo} from 'react';
import {
    Backdrop, Box, Modal, Fade, 
    Button, FormControl, FormLabel, 
    FormControlLabel, RadioGroup, Radio, 
    TextField, InputLabel, Select, MenuItem
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import DateSelector from "./DateSelector";
import ByOrdersList from './ByOrdersList';
import ByItemsList from './ByItemsList';
const useStyles = makeStyles((theme) => ({
    filterButtonSection: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        "& > button": {
            marginLeft: "0.5rem"
        }
    },
    filterMainSection: {
        display: "flex",
        flexDirection: "column"
    },
    filterMainSubSection: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "5px",
        marginBottom: "5px"
    },
    formControl: {      
        minWidth: 120,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "auto",
    },
    select: {
        color:"#212121",
        width: 120,
    }
}));
const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  padding: '0.25rem',
  display: 'flex',
  flexDirection: 'column'
};

function FilterModal(props) {
    const classes = useStyles()
    const {
        selectBy, onChangeSelectBy, SelectBy,
        orderStatus, onChangeOrderStatus, OrderStatuses,
        startDate, onChangeStartDate, endDate, onChangeEndDate
    } = props;
    console.log("Render: FilterModal");
    return (
        <div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.open}
            onClose={props.closeFilter}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 200,
            }}
        >
            <Fade in={props.open}>
                <Box sx={boxStyle}>
                    <div className={classes.filterButtonSection}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={props.closeFilter}
                        >
                            X
                        </Button>
                    </div>
                    <div className={classes.filterMainSection}>
                        <div className={classes.filterMainSubSection}>
                            <DateSelector 
                                formControlClass={classes.formControl}
                                startDate={startDate}
                                onChangeStartDate={onChangeStartDate}
                                endDate={endDate}
                                onChangeEndDate={onChangeEndDate}
                            />
                        </div>
                        <div className={classes.filterMainSubSection}>
                            <FormControl 
                                variant="outlined" 
                                className={classes.formControl} 
                                size="small"
                            >
                                <InputLabel id="demo-simple-select-outlined-label" color="primary">Select By</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={selectBy}
                                    onChange={onChangeSelectBy}
                                    label="Select By"
                                    color="primary"
                                    className={classes.select}
                                >
                                {
                                    SelectBy.list.map(type => <MenuItem key={type.value} value={type.value}>{type.desc}</MenuItem>)
                                }
                                </Select>
                            </FormControl>
                            <FormControl 
                                className={classes.formControl}
                            >
                                <TextField
                                    label="Filter by content" 
                                    variant="outlined" 
                                    size="small"
                                />
                            </FormControl>
                        </div>
                        <div className={classes.filterMainSubSection}>
                            <FormControl className={classes.formControl}>
                                <FormLabel component="span">Order Status</FormLabel>
                                 <RadioGroup row value={orderStatus} onChange={onChangeOrderStatus}>
                                    {
                                       OrderStatuses.list.map(os => {
                                          return (
                                             <FormControlLabel 
                                                key={os.value}
                                                value={os.value} 
                                                control={<Radio color="primary"/>} 
                                                label={os.desc}
                                             />
                                          )
                                       })
                                    }
                                 </RadioGroup>
                              </FormControl>
                        </div>
                        <div className={classes.filterMainSubSection}>
                            {
                                ((sb) => {
                                    switch (sb) {
                                        case SelectBy.OrdersType:
                                            return <ByOrdersList />;
                                        case SelectBy.ItemsType:
                                            return <ByItemsList />;
                                        default:
                                            return null;
                                    }
                                })(selectBy)
                            }
                        </div>
                    </div>
                    <div className={classes.filterButtonSection}>
                        <Button
                            variant="contained"
                            color="primary"
                        >
                            Process
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                        >
                            Clear
                        </Button>
                    </div>
                </Box>
            </Fade>
        </Modal>
        </div>
    );
}

export default memo(FilterModal)