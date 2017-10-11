export const TOGGLE_SIDE_BAR = 'TOGGLE_SIDE_BAR'

export function toggleSidebar(openFromRight) {
    return {type: TOGGLE_SIDE_BAR, openFromRight: openFromRight};
}
