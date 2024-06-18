import { Schema } from 'mongoose';

export const HealthSchema = new Schema({
    value: { type: String, required: true },
});

import { Document } from 'mongoose';

export interface IHealthSchema extends Document {
    value: string;
}