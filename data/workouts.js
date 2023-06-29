let workouts = [
    {
        name: 'Bench Press',
        bestSet: '5 x 100',
        date: 'Jun 29 2023',
        sets: [
            { reps: 5, weight: 100 },
            { reps: 5, weight: 100 },
            { reps: 5, weight: 100 },
        ]
    },
    {
        name: 'Bench Press',
        bestSet: '5 x 100',
        date: 'Jun 29 2023',
        sets: [
            { reps: 5, weight: 100 },
            { reps: 5, weight: 100 },
            { reps: 5, weight: 100 },
        ]
    },
]

export function getWorkouts() {
    return workouts;
}

export function setWorkouts(newWorkouts) {
    workouts = newWorkouts;
}
export default workouts;