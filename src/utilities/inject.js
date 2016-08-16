import config from 'config';

class Wrapper {
    getInstance() {
        return null;
    }
}

class SingletonWrapper extends Wrapper {
    constructor(ClassType) {
        super();

        this.ClassType = ClassType;
        this.instance = null;
    }

    getInstance() {
        return this.instance || (this.instance = new SingletonWrapper());
    }
}

export const singleton = (ClassType) => new SingletonWrapper(ClassType);


export const bindConfig = (configKey, selector = null) => (ClassType) => {
    if (ClassType instanceof Wrapper) {
        return new ClassType.constructor(bindConfig(configKey, selector)(ClassType));
    }

    return class ConfigWrapper extends ClassType {
        constructor() {
            const conf = config.get(configKey);
            super(selector ? conf.get(config.get(selector)) : conf);
        }
    };
};
export const inject = (ClassType) => (
    (ClassType instanceof Wrapper)
        ? ClassType.getInstance()
        : new ClassType()
);
