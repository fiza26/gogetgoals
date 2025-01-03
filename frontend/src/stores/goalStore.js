import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useGoalsStore = defineStore('goals', () => {

    const modalState = ref(false)

    const closeModal = (() => {
        modalState.value = false
        editState.value = false
        goalTitle.value = ''
        goalDescription.value = ''
    })

    const goalTitle = ref('')
    const goalDescription = ref('')
    const newGoal = ref(null)

    // Edit and delete functionality
    const editState = ref(false)
    const selectedGoal = ref(null)

    const changeEditState = ((goal) => {
        editState.value = true
        goalTitle.value = goal.title,
            goalDescription.value = goal.description,
            selectedGoal.value = goal
    })

    async function editGoal() {
        try {
            const response = await axios.post('http://localhost:8000/editgoal', {
                id: selectedGoal.value.id,
                title: goalTitle.value,
                description: goalDescription.value
            })
            if (response.data) {
                window.alert('Selected post has been updated')
            }
            await getAllGoals()
            editState.value = false
            goalTitle.value = ''
            goalDescription.value = ''
        } catch (error) {
            console.log(error)
        }
    }

    const showOptions = ((goal) => {
        goal.optionsState = !goal.optionsState
    })

    return {
        editState,
        selectedGoal,
        goalTitle,
        goalDescription,
        changeEditState,
        editGoal,
        showOptions,
        closeModal
    };

})