export const TOGGLE_SIDE_BAR = 'TOGGLE_SIDE_BAR'
export const GET_SIDE_BAR_STATUS = 'GET_SIDE_BAR_STATUS'

export function toggleSidebar() {
    return {
        type: TOGGLE_SIDE_BAR,
    };
}

export function getSidebarStatus(){
return {
        type: GET_SIDE_BAR_STATUS,
    };
}