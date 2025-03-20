export default function InputField({ type }) {
    return (
        <>
            { type === "text" ? (
                    <input type="text" name="input" id="input" />
                ) : (
                    <input type="checkbox" name="input" id="input" />
            )}

            { type === "checkbox" && <p>Select/Unselect</p>

            }
        </>
    )

}