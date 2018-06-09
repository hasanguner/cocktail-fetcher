export interface FileManager {

    write(fileName: string, data: string): Promise<void>;

    read(filename: string): Promise<string>;
}
