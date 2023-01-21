/**
 * A Lambda function that returns a static string
 */
exports.lambdaHandler = async() => {
    // mock s3 json body
    const preferences = {
        "version": 0.1,
        "preferences": [
            "History",
            "Gaming",
            "Food",
            "Design",
            "Film",
            "Travel",
            "Politics",
            "Economics",
            "Comedy",
            "Musicals",
            "Horrors",
            "Work",
            "Comics",
            "Musical"
        ]
    };

    return preferences;
}
