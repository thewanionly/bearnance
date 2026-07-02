import { config } from '@bearnance/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config[]} */
export default [...config, { ignores: ['src/components/icons/generated/**'] }];
