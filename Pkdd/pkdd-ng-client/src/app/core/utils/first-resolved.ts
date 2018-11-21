export function firstResolved<T>(promises: Promise<T>[]): Promise<T> {
    return Promise.all(promises.map(p => {
        return p.then(
            value => Promise.reject(value),
            error => Promise.resolve(error)
        );
    })).then(
        errors => Promise.reject(errors),
        value => Promise.resolve(value)
    );
}
