import React, { type PropsWithChildren } from 'react';
import { act, create } from 'react-test-renderer';

export interface RenderHookOptions {
  wrapper?: React.ComponentType<PropsWithChildren>;
}

export interface RenderHookResult<TResult> {
  result: { current: TResult };
  rerender(): Promise<void>;
  unmount(): Promise<void>;
}

export async function renderHook<TResult>(
  renderCallback: () => TResult,
  options?: RenderHookOptions,
): Promise<RenderHookResult<TResult>> {
  const result = { current: undefined as unknown as TResult };
  let renderer!: ReturnType<typeof create>;
  const Wrapper = options?.wrapper;

  function Probe() {
    result.current = renderCallback();
    return null;
  }

  function buildTree() {
    return Wrapper ? (
      <Wrapper>
        <Probe />
      </Wrapper>
    ) : (
      <Probe />
    );
  }

  await act(async () => {
    renderer = create(buildTree());
  });

  return {
    result,
    rerender: () => act(async () => renderer.update(buildTree())),
    unmount: () => act(async () => renderer.unmount()),
  };
}
