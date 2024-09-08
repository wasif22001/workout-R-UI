import {createContext, useReducer} from "react";

// creates and exports a brancd new context (React context is a way that we can provide kind of Global state to many different components in the application and we can update our 
// our state by dispatching actions from these components as well)
export const WorkoutContext = createContext()

export const workoutsReducer = (state, action) => {

    switch(action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]  // Adding the new workout to the top and then spreading the workouts in the previous state and adding them also.
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
        
    }

}

export const WorkoutContextProvider = ({children}) => {
    
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })


    return ( 
        <WorkoutContext.Provider value={{...state, dispatch}}>
        {/* Needs to wrap whatever part of our application needs access to the context  */}
        {/* In order for every component to have access to it, wrap the whole application or the whole component tree. */}
            {children}
        </WorkoutContext.Provider>

    )
}

