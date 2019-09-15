// @flow
import React, {useState, useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, InputLabel, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import KeyBoardArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import filterIcon from '../../assets/images/filters.png';
import FormControl  from '@material-ui/core/FormControl';
import Select  from '@material-ui/core/Select';
import MenuItem  from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import debounce from 'lodash/debounce';
import SearchFiltersMobile from './SearchFiltersMobile';
import { logarithmicSlider, logPositionSlider } from './../../Utils/Utils';

import * as searchFiltersActionCreators from '../../store/actions/searchFilters';


const useStyles = makeStyles(theme =>({
  root: {
    margin: '0 3rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(6, max-content)',
    gridColumnGap: '2rem',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.7rem',
    padding: '1rem',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '5px',

  },
  
  filterSize: {
    height: '1.8rem',
    width: '1.8rem',
    paddingTop: '5px'
  },
  wrapper: {
   
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer'
    
  },
  textWrapper: {
    position: 'relative',
    // '&:hover  $menuServices': {
    //   visibility: 'visible',
    //   opacity: '1'
    // }
  },
  // styles of TYPE OF BEACH dropdown
  menuTypeOfBeach: {
    zIndex: '100',
    clipPath: 'polygon(0% 4%, 5% 4%, 10% 0%, 15% 4% ,100% 4%, 100% 100%, 0% 100%)',
    // backgroundColor: '#F5F5F5',
    background: 'linear-gradient(to bottom right, #e1e1e1, #fff)',
    position: 'absolute',
    paddingTop: '1rem',
    top: '1.8rem',
    left: '0',
    height: '25rem',
    width: '50rem',
    overflowY: 'scroll'
    
  },
  typeOfBeachListRoot: {
    width: '100%',
    maxWidth: '50rem'
  },
  typeOfBeachSlider: {
    width: '30rem',
    color: theme.palette.secondary.main,
  },
  // styles of SERVICES dropdown
  menuServices: {
    zIndex: '100',
    clipPath: 'polygon(0% 4%, 5% 4%, 10% 0%, 15% 4% ,100% 4%, 100% 100%, 0% 100%)',
    // backgroundColor: '#F5F5F5',
    background: 'linear-gradient(to bottom right, #e1e1e1, #fff)',
    position: 'absolute',
    paddingTop: '1rem',
    top: '1.8rem',
    left: '0',
    height: '30rem',
    width: '30rem',
    overflowY: 'scroll',
  },
  servicesListRoot: {
    width: '100%',
    maxWidth: '30rem'
  },
  menuGeneral: {
    zIndex: '100',
    clipPath: 'polygon(0% 4%, 5% 4%, 10% 0%, 15% 4% ,100% 4%, 100% 100%, 0% 100%)',
    // backgroundColor: '#F5F5F5',
    background: 'linear-gradient(to bottom right, #e1e1e1, #fff)',
    position: 'absolute',
    paddingTop: '2rem',
    top: '1.8rem',
    left: '0',
    height: '30rem',
    width: '40rem',
    overflowY: 'scroll',
  
    
  },
  notActive: {
    display: 'none'
  },
  active: {
    color: '#FABC3D !important'
  },
  textStyle: {
    color: '#fff',
    transition: 'all 0.3s',
    '&:hover': {
      color: theme.palette.secondary.main
    }
  },
  generalPadding: {
    paddingTop: '1.5rem'
  },
  marginCheckbox: {
    margin: '0 1rem'
  },
  labelTextFieldStyle: {
    color: '#fff',
    opacity: '0.6'
  },
  // styles of GENERAL dropdown
  generalListRoot: {
    width: '100%',
    maxWidth: '40rem'
  },
  generalOcuppancyFormControl: {
    width: '20rem',
    marginLeft: '2rem'
  },
  generalPrimary: {
    marginLeft: '1.7rem',
    
  },
  generalSecondary: {
    marginLeft: '1.7rem',
    marginTop: '1rem'
  },
  sliderThumb: {
    backgroundColor: theme.palette.secondary.main,
    '&:focus,&:hover,&$active': {
      // boxShadow: 'inherit', deletes it
      boxShadow: '#ccc 0px 0px 1px 6px',
      MozBoxShadow: '#ccc 0px 0px 1px 6px'

    },
  },
  generalSlider: {
    width: '20rem',
    color: theme.palette.secondary.main,
  },
  generalSpanKmLeft: {
    display: 'inline-block',
    transform: 'translateY(-7px)',
    marginRight: '0.7rem',
    color: '#777'
  },
  generalSpanKmRight: {
    display: 'inline-block',
    transform: 'translateY(-7px)',
    marginLeft: '1.7rem',
    color: '#777'
  }

}));

type Props = {
  filters: {
    nudism: boolean,
    blueFlag: boolean,
    surfingArea: boolean,
    beachBar: boolean,
    nauticsRental: boolean,
    divingArea: boolean,
    sunbedRental: boolean,
    beachUmbrellaRental: boolean,
    disabledPersons: boolean,
    occupancy: string,
    promenade: boolean,
    hospitalDistance: number,
    beachLength: number,
    selectText: string,
    searchText: string
  },
  actions: {
    setNudism: typeof searchFiltersActionCreators.setNudism,
    setBlueFlag: typeof searchFiltersActionCreators.setBlueFlag,
    setSurfingArea: typeof searchFiltersActionCreators.setSurfingArea,
    setBeachBar: typeof searchFiltersActionCreators.setBeachBar,
    setNauticsRental: typeof searchFiltersActionCreators.setNauticsRental,
    setDivingArea: typeof searchFiltersActionCreators.setDivingArea,
    setDisabledPersons: typeof searchFiltersActionCreators.setDisabledPersons,
    setOccupancy: typeof searchFiltersActionCreators.setOccupancy,
    setPromenade: typeof searchFiltersActionCreators.setPromenade,
    setHospitalDistance: typeof searchFiltersActionCreators.setHospitalDistance,
    setBeachLength: typeof searchFiltersActionCreators.setBeachLength,
    setSearchText: typeof searchFiltersActionCreators.setSearchText,
    setUmbrellaBeachRental: typeof searchFiltersActionCreators.setUmbrellaBeachRental,
    setSunbedRental: typeof searchFiltersActionCreators.setSunbedRental,
    setSelectText: typeof searchFiltersActionCreators.setSelectText,
    setReset: typeof searchFiltersActionCreators.setReset
  }
};

const SearchFilters = (props: Props) => {
  const { filters, actions } = props;
  const classes = useStyles();
  const debouncedhospitalDistance = useCallback(debounce(actions.setHospitalDistance, 500), []);
  const debouncedContainText = useCallback(debounce(actions.setSearchText, 500), []);
  const debouncedBeachLength = useCallback(debounce(actions.setBeachLength, 500), []);
  const [stateServices, setStateServices] = useState(false);
  const [stateTypeOfBeach, setStateTypeOfBeach] = useState(false);
  const [stateGeneral, setStateGeneral] = useState(false);
  const [valueContainText, setValueContainText] = useState(filters.searchText);
  const [hospitalDistance, setHospitalDistance] = useState(filters.hospitalDistance);
  const [beachLength, setBeachLength] = useState(filters.beachLength);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(900));

  const handleClick = (name: string) => event => {
    if (name === 'services') {
     
      setStateServices(!stateServices);
      if (stateServices === false) {
        setStateGeneral(false);
        setStateTypeOfBeach(false);
      }
    } else if (name === 'typeOfBeach') {
      setStateTypeOfBeach(!stateTypeOfBeach);
      if (stateTypeOfBeach === false) {
        setStateServices(false);
        setStateGeneral(false);
      }
    } else if (name === 'general') {
      setStateGeneral(!stateGeneral);
      if (stateGeneral === false) {
        setStateServices(false);
        setStateTypeOfBeach(false);
      }
    }
  }
  const checkBoxHandler = (name: string) => (event: {target: { checked: boolean}}) => {
    if (name === 'nudismo') {
      actions.setNudism(event.target.checked);
    } else if (name === 'bandera_azul') {
      actions.setBlueFlag(event.target.checked);
    } else if (name === 'zona_surf') {
      actions.setSurfingArea(event.target.checked);
    } else if (name === 'establecimiento_comida') {
      actions.setBeachBar(event.target.checked);
    } else if (name === 'alquiler_nauticos') {
      actions.setNauticsRental(event.target.checked);
    } else if (name === 'submarinismo') {
      actions.setDivingArea(event.target.checked);
    } else if (name === 'alquiler_hamacas') {
      actions.setSunbedRental(event.target.checked);
    } else if (name === 'alquiler_sombrillas') {
      actions.setUmbrellaBeachRental(event.target.checked);
    } else if (name === 'acceso_discapacitados') {
      actions.setDisabledPersons(event.target.checked);
    } else if (name === 'paseo_maritimo') {
      actions.setPromenade(event.target.checked);
    }
  };

  const handleOccupancy = (event: {target: {value: string}} )=> {
    actions.setOccupancy(event.target.value);
  }
  const handleHospitalDistanceChange = (event,newValue: number) => {
    setHospitalDistance(newValue);
    debouncedhospitalDistance(newValue);
  

  }
  const handleBeachLengthChange = (event, newValue: number) => {
    const value = logarithmicSlider(newValue);
    setBeachLength(value);
    debouncedBeachLength(value);
  }
  const handleSelectChange = (e: {target: { value: string}}) => {

    actions.setSelectText(e.target.value);
  }
  const handleContainText = (e: {target: { value: string}}) => {
    const value = e.target.value;
    setValueContainText(value);
    debouncedContainText(value);
    
  }

  const handleOnReset = () => {
    // hide menus
    setStateServices(false);
    setStateGeneral(false);
    setStateTypeOfBeach(false);
    // reset state in Redux
    actions.setReset();
  }
  // Active menu customization
  // type of beach
  let isActiveTypeOfBeach = classes.notActive;
  let highlightSpanTypeOfBeach = '';
  let highlightArrowIconTypeOfBeach = '#000'
  if (stateTypeOfBeach) {
    isActiveTypeOfBeach = '';
    highlightArrowIconTypeOfBeach = '#FABC3D';
    highlightSpanTypeOfBeach = classes.active
  }
  // services
  let isActiveServices = classes.notActive;
  let highlightSpanServices = ''
  let highlightArrowIconServices = '#000'
  if (stateServices) {
    isActiveServices = '';
    highlightArrowIconServices = '#FABC3D'
    highlightSpanServices = classes.active
  };
  // general
  let isActiveGeneral = classes.notActive;
  let highlightSpanGeneral = ''
  let highlightArrowIconGeneral = '#000'
  if (stateGeneral) {
    isActiveGeneral = '';
    highlightArrowIconGeneral = '#FABC3D'
    highlightSpanGeneral = classes.active
  }
  let contentDesktop = (
    <div className={classes.root}>
      
      <div className={classes.generalPadding}>
        <span className={classes.textStyle} style={{ color: '#BBDEFB'}}>FILTERS </span>
        <img className={classes.filterSize} src={filterIcon} alt="filter icon" />
      </div>

      {/* TYPE OF BEACH *********************************************************** */}
      <div  
        className={`${classes.wrapper} ${classes.generalPadding}`}>
        <div className={classes.textWrapper}>
          <span onClick={handleClick('typeOfBeach')} className={`${classes.textStyle} ${highlightSpanTypeOfBeach}`}>Type of Beach</span>
          <div className={`${classes.menuTypeOfBeach} ${isActiveTypeOfBeach}`} >
            <List classes={{
              root: classes.typeOfBeachListRoot
            }}>
              <ListItem alignItems="flex-start">
                <FormControlLabel
                  className={classes.marginCheckbox}
                  control={
                    <Checkbox
                       checked={filters.nudism}
                       onChange={checkBoxHandler('nudismo')}
                      value="nudismo"
                    />
                  }
                  label="Nudism"
                />
              </ListItem>
              <Divider />
              <ListItem alignItems="flex-start">
                <FormControlLabel
                  className={classes.marginCheckbox}
                  control={
                    <Checkbox
                      checked={filters.blueFlag}
                      onChange={checkBoxHandler('bandera_azul')}
                      value="bandera_azul"
                    />
                  }
                  label="Blue flag"
                />
              </ListItem>
              <Divider />
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary="Beach max length"
                  secondary={
                    <React.Fragment>


                      <span className={classes.generalSpanKmLeft}>50 m</span>
                      <Slider
                        classes={{
                          root: classes.typeOfBeachSlider,
                          thumb: classes.sliderThumb
                        }}
                        defaultValue={beachLength}
                        value={logPositionSlider(beachLength)}
                        onChange={handleBeachLengthChange}
                        min={0}
                        max={100}
                        color="secondary"
                      />
                      <span className={classes.generalSpanKmRight}>28k m</span>

                      <span style={{ marginLeft: '12rem', display: 'block' }}>{Math.round(beachLength)} meters</span>
                    </React.Fragment>
                  }
                  classes={{
                    primary: classes.generalPrimary,
                    secondary: classes.generalSecondary
                  }}
                />
              </ListItem>

            </List>
          </div>
        </div>
        <KeyBoardArrowDownIcon 
          onClick={handleClick('typeOfBeach')}
          style={{ fill: highlightArrowIconTypeOfBeach}}/>
      </div>

      {/* SERVICES *********************************************************** */}
      <div 
        className={`${classes.wrapper} ${classes.generalPadding}`}>
        <div className={classes.textWrapper}>
          <span onClick={handleClick('services')} className={`${classes.textStyle} ${highlightSpanServices}`}>Services</span>
          <div className={`${classes.menuServices} ${isActiveServices}`}>
            <List classes={{
              root: classes.servicesListRoot
            }}>
              <ListItem alignItems="flex-start">
                <FormControlLabel
                  className={classes.marginCheckbox}
                  control={
                  <Checkbox
                    checked={filters.surfingArea}
                    onChange={checkBoxHandler('zona_surf')}
                    value="zona_surf"
                  />
                  }
                  label="Surfing area"
                />
              </ListItem>
              <Divider />
              <ListItem alignItems="flex-start">
                <FormControlLabel
                  className={classes.marginCheckbox}
                  control={
                  <Checkbox
                    checked={filters.beachBar}
                    onChange={checkBoxHandler('establecimiento_comida')}
                    value="establecimiento_comida"
                  />
                  }
                  label="Beach bar"
                  />
              </ListItem>
              <Divider />
              <ListItem alignItems="flex-start">
                <FormControlLabel
                  className={classes.marginCheckbox}
                  control={
                  <Checkbox
                    checked={filters.nauticsRental}
                    onChange={checkBoxHandler('alquiler_nauticos')}
                    value="alquiler_nauticos"
                  />
                  }
                  label="Nautics rental"
                  />
              </ListItem>
              <Divider />
              <ListItem alignItems="flex-start">
                <FormControlLabel
                  className={classes.marginCheckbox}
                  control={
                  <Checkbox
                    checked={filters.divingArea}
                    onChange={checkBoxHandler('submarinismo')}
                    value="submarinismo"
                  />
                  }
                  label="Diving area"
                  />
              </ListItem>
              <Divider />
              <ListItem alignItems="flex-start">
                <FormControlLabel
                  className={classes.marginCheckbox}
                  control={
                    <Checkbox
                      checked={filters.sunbedRental}
                      onChange={checkBoxHandler('alquiler_hamacas')}
                      value="alquiler_hamacas"
                    />
                  }
                  label="Sunbed rental"
                />
              </ListItem>
              <Divider />
              <ListItem alignItems="flex-start">
                <FormControlLabel
                  className={classes.marginCheckbox}
                  control={
                    <Checkbox
                      checked={filters.beachUmbrellaRental}
                      onChange={checkBoxHandler('alquiler_sombrillas')}
                      value="alquiler_sombrillas"
                    />
                  }
                  label="Beach umbrella rental"
                />
              </ListItem>
            </List>
          </div>
        </div>
        <KeyBoardArrowDownIcon 
          onClick={handleClick('services')} 
          style={{ fill: highlightArrowIconServices}}
          />
      </div>
      {/* GENERAL *********************************************************** */}
      <div 
        className={`${classes.wrapper} ${classes.generalPadding}`}>
        <div className={classes.textWrapper}>
          <span onClick={handleClick('general')} className={`${classes.textStyle} ${highlightSpanGeneral}`}>General</span>
          <div className={`${classes.menuGeneral} ${isActiveGeneral}`}>
            <List classes={{
              root: classes.generalListRoot
            }}>
              <ListItem alignItems="flex-start">
                <FormControlLabel
                  className={classes.marginCheckbox}
                  control={
                    <Checkbox
                      checked={filters.disabledPersons}
                      onChange={checkBoxHandler('acceso_discapacitados')}
                      value="acceso_discapacitados"
                    />
                  }
                  label="Disabled persons"
                />
              </ListItem>
              <Divider />
              <ListItem alignItems="flex-start">
                <FormControlLabel
                  className={classes.marginCheckbox}
                  control={
                    <Checkbox
                       checked={filters.promenade}
                      onChange={checkBoxHandler('paseo_maritimo')}
                      value="paseo_maritimo"
                    />
                  }
                  label="Promenade"
                />
              </ListItem>
              <Divider />
              <ListItem alignItems="flex-start">
                <FormControl classes={{
                  root: classes.generalOcuppancyFormControl
                }}>
                  <InputLabel htmlFor="select">Occupancy</InputLabel>
                  <Select
                    value={filters.occupancy}
                    onChange={handleOccupancy} >
                    <MenuItem value="All">
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value="Alto">
                      High
                    </MenuItem>
                    <MenuItem value="Bajo">
                      Low
                    </MenuItem>
                    <MenuItem value="Medio">
                      Average
                    </MenuItem>
                    <MenuItem value="Medio / Alto">
                      Average / High
                    </MenuItem>
                    <MenuItem value="Medio / Bajo">
                      Average / Low
                    </MenuItem>
                    <MenuItem value="Muy bajo">
                      Very Low
                    </MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
              <Divider />
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary="Distance to hospital"
                  secondary={
                    <React.Fragment>
                      <span className={classes.generalSpanKmLeft}>0 Km</span>
                      <Slider
                        classes={{  
                          root: classes.generalSlider,
                          thumb: classes.sliderThumb
                        }}
                        defaultValue={hospitalDistance}
                        value={hospitalDistance}
                        valueLabelDisplay="auto"
                        onChange={handleHospitalDistanceChange}
                        min={0}
                        max={120}
                        color="secondary"
                        />
                      <span className={classes.generalSpanKmRight}>120 Km</span>
                      
                    </React.Fragment>
                  }
                  classes={{
                    primary: classes.generalPrimary,
                    secondary: classes.generalSecondary
                  }}
                />
                </ListItem>
            </List>
          </div>
        </div>
        <KeyBoardArrowDownIcon 
          onClick={handleClick('general')} 
          style={{ fill: highlightArrowIconGeneral }}
          />
      </div>
     
      <div className={classes.wrapper}>
        <FormControl>
          <InputLabel htmlFor="select" style={{color: '#fff'}}>Select by</InputLabel>
          <Select
             value={filters.selectText}
             onChange={handleSelectChange}
          >
            <MenuItem value="termino_municipal">
              Locality
            </MenuItem>
            <MenuItem value="nombre">
              Beach
            </MenuItem>
            <MenuItem value="comunidad_autonoma">
              Region
            </MenuItem>
          </Select>

        </FormControl>       
        <TextField
          id="my-search"
          label="Contain text"
          type="search"
          value={valueContainText}
          InputLabelProps={{
            className: classes.labelTextFieldStyle,
          }}
          style={{ marginLeft: '2rem' }}
          onChange={handleContainText}
          margin="none"
        />
      </div>
      <div className={`${classes.wrapper} ${classes.generalPadding}`}>
        <Typography onClick={handleOnReset} variant="subtitle1" style={{opacity: '0.6'}}>Clear filters</Typography>
      </div>
      </div>
  );

  let contentMobile = (<SearchFiltersMobile
    filters={filters}
    actions={actions}
  />);
  let content = contentDesktop;
  if (matches) {
    content = contentMobile;
  }
  return (
    <React.Fragment>
      {content}  
    </React.Fragment>
      );
}

export default SearchFilters;