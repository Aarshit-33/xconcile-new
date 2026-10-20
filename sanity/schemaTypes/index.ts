import { type SchemaTypeDefinition } from 'sanity'

// Written by the lead / inquiry forms (app/actions/submit-lead.ts, submit-inquiry.ts)
import contactSubmission from './contactSubmission'

// Site page types, designed from scratch for the redesign
import { v2Types } from './v2'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [...v2Types, contactSubmission],
}
