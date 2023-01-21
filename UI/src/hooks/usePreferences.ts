export interface UserPreference {
    enableNotification: boolean,
    subsribedTopics: string[]
}

export function usePreferences() {

    const getPreferencesList = async () => {
        return [
            "History","Gaming","Food","Design", "Film", "Travel", "Politics", "Economics", "Comedy", "Musicals", "Horrors", "Work", "Comics", "Musical"
        ];
    }
    const setUserPreferences = async (preferences: string[]) => {

    };

    const getUserPreferences = async () => {
        return {
            enableNotification: true,
            subsribedTopics: ["Economics", "Comedy", "Musical", "Horrors","Gaming"]
        }
    };

    return {
        getUserPreferences,
        setUserPreferences,
        getPreferencesList
    };
}