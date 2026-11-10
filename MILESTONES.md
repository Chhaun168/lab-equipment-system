# Milestones - Lab Equipment Lending System

## M1 Frontend Prototype

### What state lives in the store and what stays inside a component? Why?
Global data that needs to be shared across multiple views—such as the equipment catalog list, loading/error flags, and submitted loan requests—lives in Pinia stores (`equipmentStore` and `loanStore`). This ensures data consistency across the application. Local UI state that only affects a single component—such as form input values (`form`), local submission flags (`submitted`), and validation states—stays inside the component because other parts of the application do not need access to it.