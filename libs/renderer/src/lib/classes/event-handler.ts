export class EventHandler {
    events: Map<string, () => void> = new Map();

    register(id: string, event: () => void) {
        this.events.set(id, event);
    }

    unregister(id: string) {
        this.events.delete(id);
    }

    trigger(id: string) {
        if(this.events.has(id)){
            let event = this.events.get(id);
            if(event !== undefined) {
                event();
            }
        }
    }
}