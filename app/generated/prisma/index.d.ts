
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Quota_Policy
 * 
 */
export type Quota_Policy = $Result.DefaultSelection<Prisma.$Quota_PolicyPayload>
/**
 * Model Fixed
 * 
 */
export type Fixed = $Result.DefaultSelection<Prisma.$FixedPayload>
/**
 * Model Percentage
 * 
 */
export type Percentage = $Result.DefaultSelection<Prisma.$PercentagePayload>
/**
 * Model Stop
 * 
 */
export type Stop = $Result.DefaultSelection<Prisma.$StopPayload>
/**
 * Model Route
 * 
 */
export type Route = $Result.DefaultSelection<Prisma.$RoutePayload>
/**
 * Model RouteStop
 * 
 */
export type RouteStop = $Result.DefaultSelection<Prisma.$RouteStopPayload>
/**
 * Model BusAssignment
 * 
 */
export type BusAssignment = $Result.DefaultSelection<Prisma.$BusAssignmentPayload>
/**
 * Model RegularBusAssignment
 * 
 */
export type RegularBusAssignment = $Result.DefaultSelection<Prisma.$RegularBusAssignmentPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const BusOperationStatus: {
  NotStarted: 'NotStarted',
  InOperation: 'InOperation',
  Completed: 'Completed'
};

export type BusOperationStatus = (typeof BusOperationStatus)[keyof typeof BusOperationStatus]

}

export type BusOperationStatus = $Enums.BusOperationStatus

export const BusOperationStatus: typeof $Enums.BusOperationStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Quota_Policies
 * const quota_Policies = await prisma.quota_Policy.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Quota_Policies
   * const quota_Policies = await prisma.quota_Policy.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.quota_Policy`: Exposes CRUD operations for the **Quota_Policy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Quota_Policies
    * const quota_Policies = await prisma.quota_Policy.findMany()
    * ```
    */
  get quota_Policy(): Prisma.Quota_PolicyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fixed`: Exposes CRUD operations for the **Fixed** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Fixeds
    * const fixeds = await prisma.fixed.findMany()
    * ```
    */
  get fixed(): Prisma.FixedDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.percentage`: Exposes CRUD operations for the **Percentage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Percentages
    * const percentages = await prisma.percentage.findMany()
    * ```
    */
  get percentage(): Prisma.PercentageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stop`: Exposes CRUD operations for the **Stop** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stops
    * const stops = await prisma.stop.findMany()
    * ```
    */
  get stop(): Prisma.StopDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.route`: Exposes CRUD operations for the **Route** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Routes
    * const routes = await prisma.route.findMany()
    * ```
    */
  get route(): Prisma.RouteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.routeStop`: Exposes CRUD operations for the **RouteStop** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RouteStops
    * const routeStops = await prisma.routeStop.findMany()
    * ```
    */
  get routeStop(): Prisma.RouteStopDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.busAssignment`: Exposes CRUD operations for the **BusAssignment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BusAssignments
    * const busAssignments = await prisma.busAssignment.findMany()
    * ```
    */
  get busAssignment(): Prisma.BusAssignmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.regularBusAssignment`: Exposes CRUD operations for the **RegularBusAssignment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RegularBusAssignments
    * const regularBusAssignments = await prisma.regularBusAssignment.findMany()
    * ```
    */
  get regularBusAssignment(): Prisma.RegularBusAssignmentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Quota_Policy: 'Quota_Policy',
    Fixed: 'Fixed',
    Percentage: 'Percentage',
    Stop: 'Stop',
    Route: 'Route',
    RouteStop: 'RouteStop',
    BusAssignment: 'BusAssignment',
    RegularBusAssignment: 'RegularBusAssignment'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "quota_Policy" | "fixed" | "percentage" | "stop" | "route" | "routeStop" | "busAssignment" | "regularBusAssignment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Quota_Policy: {
        payload: Prisma.$Quota_PolicyPayload<ExtArgs>
        fields: Prisma.Quota_PolicyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Quota_PolicyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Quota_PolicyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Quota_PolicyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Quota_PolicyPayload>
          }
          findFirst: {
            args: Prisma.Quota_PolicyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Quota_PolicyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Quota_PolicyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Quota_PolicyPayload>
          }
          findMany: {
            args: Prisma.Quota_PolicyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Quota_PolicyPayload>[]
          }
          create: {
            args: Prisma.Quota_PolicyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Quota_PolicyPayload>
          }
          createMany: {
            args: Prisma.Quota_PolicyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.Quota_PolicyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Quota_PolicyPayload>[]
          }
          delete: {
            args: Prisma.Quota_PolicyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Quota_PolicyPayload>
          }
          update: {
            args: Prisma.Quota_PolicyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Quota_PolicyPayload>
          }
          deleteMany: {
            args: Prisma.Quota_PolicyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Quota_PolicyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.Quota_PolicyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Quota_PolicyPayload>[]
          }
          upsert: {
            args: Prisma.Quota_PolicyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Quota_PolicyPayload>
          }
          aggregate: {
            args: Prisma.Quota_PolicyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuota_Policy>
          }
          groupBy: {
            args: Prisma.Quota_PolicyGroupByArgs<ExtArgs>
            result: $Utils.Optional<Quota_PolicyGroupByOutputType>[]
          }
          count: {
            args: Prisma.Quota_PolicyCountArgs<ExtArgs>
            result: $Utils.Optional<Quota_PolicyCountAggregateOutputType> | number
          }
        }
      }
      Fixed: {
        payload: Prisma.$FixedPayload<ExtArgs>
        fields: Prisma.FixedFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FixedFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FixedPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FixedFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FixedPayload>
          }
          findFirst: {
            args: Prisma.FixedFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FixedPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FixedFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FixedPayload>
          }
          findMany: {
            args: Prisma.FixedFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FixedPayload>[]
          }
          create: {
            args: Prisma.FixedCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FixedPayload>
          }
          createMany: {
            args: Prisma.FixedCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FixedCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FixedPayload>[]
          }
          delete: {
            args: Prisma.FixedDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FixedPayload>
          }
          update: {
            args: Prisma.FixedUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FixedPayload>
          }
          deleteMany: {
            args: Prisma.FixedDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FixedUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FixedUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FixedPayload>[]
          }
          upsert: {
            args: Prisma.FixedUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FixedPayload>
          }
          aggregate: {
            args: Prisma.FixedAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFixed>
          }
          groupBy: {
            args: Prisma.FixedGroupByArgs<ExtArgs>
            result: $Utils.Optional<FixedGroupByOutputType>[]
          }
          count: {
            args: Prisma.FixedCountArgs<ExtArgs>
            result: $Utils.Optional<FixedCountAggregateOutputType> | number
          }
        }
      }
      Percentage: {
        payload: Prisma.$PercentagePayload<ExtArgs>
        fields: Prisma.PercentageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PercentageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PercentagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PercentageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PercentagePayload>
          }
          findFirst: {
            args: Prisma.PercentageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PercentagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PercentageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PercentagePayload>
          }
          findMany: {
            args: Prisma.PercentageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PercentagePayload>[]
          }
          create: {
            args: Prisma.PercentageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PercentagePayload>
          }
          createMany: {
            args: Prisma.PercentageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PercentageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PercentagePayload>[]
          }
          delete: {
            args: Prisma.PercentageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PercentagePayload>
          }
          update: {
            args: Prisma.PercentageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PercentagePayload>
          }
          deleteMany: {
            args: Prisma.PercentageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PercentageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PercentageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PercentagePayload>[]
          }
          upsert: {
            args: Prisma.PercentageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PercentagePayload>
          }
          aggregate: {
            args: Prisma.PercentageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePercentage>
          }
          groupBy: {
            args: Prisma.PercentageGroupByArgs<ExtArgs>
            result: $Utils.Optional<PercentageGroupByOutputType>[]
          }
          count: {
            args: Prisma.PercentageCountArgs<ExtArgs>
            result: $Utils.Optional<PercentageCountAggregateOutputType> | number
          }
        }
      }
      Stop: {
        payload: Prisma.$StopPayload<ExtArgs>
        fields: Prisma.StopFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StopFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StopPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StopFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StopPayload>
          }
          findFirst: {
            args: Prisma.StopFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StopPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StopFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StopPayload>
          }
          findMany: {
            args: Prisma.StopFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StopPayload>[]
          }
          create: {
            args: Prisma.StopCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StopPayload>
          }
          createMany: {
            args: Prisma.StopCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StopCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StopPayload>[]
          }
          delete: {
            args: Prisma.StopDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StopPayload>
          }
          update: {
            args: Prisma.StopUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StopPayload>
          }
          deleteMany: {
            args: Prisma.StopDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StopUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StopUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StopPayload>[]
          }
          upsert: {
            args: Prisma.StopUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StopPayload>
          }
          aggregate: {
            args: Prisma.StopAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStop>
          }
          groupBy: {
            args: Prisma.StopGroupByArgs<ExtArgs>
            result: $Utils.Optional<StopGroupByOutputType>[]
          }
          count: {
            args: Prisma.StopCountArgs<ExtArgs>
            result: $Utils.Optional<StopCountAggregateOutputType> | number
          }
        }
      }
      Route: {
        payload: Prisma.$RoutePayload<ExtArgs>
        fields: Prisma.RouteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RouteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RouteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          findFirst: {
            args: Prisma.RouteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RouteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          findMany: {
            args: Prisma.RouteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>[]
          }
          create: {
            args: Prisma.RouteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          createMany: {
            args: Prisma.RouteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RouteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>[]
          }
          delete: {
            args: Prisma.RouteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          update: {
            args: Prisma.RouteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          deleteMany: {
            args: Prisma.RouteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RouteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RouteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>[]
          }
          upsert: {
            args: Prisma.RouteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          aggregate: {
            args: Prisma.RouteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoute>
          }
          groupBy: {
            args: Prisma.RouteGroupByArgs<ExtArgs>
            result: $Utils.Optional<RouteGroupByOutputType>[]
          }
          count: {
            args: Prisma.RouteCountArgs<ExtArgs>
            result: $Utils.Optional<RouteCountAggregateOutputType> | number
          }
        }
      }
      RouteStop: {
        payload: Prisma.$RouteStopPayload<ExtArgs>
        fields: Prisma.RouteStopFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RouteStopFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RouteStopPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RouteStopFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RouteStopPayload>
          }
          findFirst: {
            args: Prisma.RouteStopFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RouteStopPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RouteStopFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RouteStopPayload>
          }
          findMany: {
            args: Prisma.RouteStopFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RouteStopPayload>[]
          }
          create: {
            args: Prisma.RouteStopCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RouteStopPayload>
          }
          createMany: {
            args: Prisma.RouteStopCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RouteStopCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RouteStopPayload>[]
          }
          delete: {
            args: Prisma.RouteStopDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RouteStopPayload>
          }
          update: {
            args: Prisma.RouteStopUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RouteStopPayload>
          }
          deleteMany: {
            args: Prisma.RouteStopDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RouteStopUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RouteStopUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RouteStopPayload>[]
          }
          upsert: {
            args: Prisma.RouteStopUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RouteStopPayload>
          }
          aggregate: {
            args: Prisma.RouteStopAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRouteStop>
          }
          groupBy: {
            args: Prisma.RouteStopGroupByArgs<ExtArgs>
            result: $Utils.Optional<RouteStopGroupByOutputType>[]
          }
          count: {
            args: Prisma.RouteStopCountArgs<ExtArgs>
            result: $Utils.Optional<RouteStopCountAggregateOutputType> | number
          }
        }
      }
      BusAssignment: {
        payload: Prisma.$BusAssignmentPayload<ExtArgs>
        fields: Prisma.BusAssignmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BusAssignmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusAssignmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BusAssignmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusAssignmentPayload>
          }
          findFirst: {
            args: Prisma.BusAssignmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusAssignmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BusAssignmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusAssignmentPayload>
          }
          findMany: {
            args: Prisma.BusAssignmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusAssignmentPayload>[]
          }
          create: {
            args: Prisma.BusAssignmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusAssignmentPayload>
          }
          createMany: {
            args: Prisma.BusAssignmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BusAssignmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusAssignmentPayload>[]
          }
          delete: {
            args: Prisma.BusAssignmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusAssignmentPayload>
          }
          update: {
            args: Prisma.BusAssignmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusAssignmentPayload>
          }
          deleteMany: {
            args: Prisma.BusAssignmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BusAssignmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BusAssignmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusAssignmentPayload>[]
          }
          upsert: {
            args: Prisma.BusAssignmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusAssignmentPayload>
          }
          aggregate: {
            args: Prisma.BusAssignmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBusAssignment>
          }
          groupBy: {
            args: Prisma.BusAssignmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<BusAssignmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.BusAssignmentCountArgs<ExtArgs>
            result: $Utils.Optional<BusAssignmentCountAggregateOutputType> | number
          }
        }
      }
      RegularBusAssignment: {
        payload: Prisma.$RegularBusAssignmentPayload<ExtArgs>
        fields: Prisma.RegularBusAssignmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RegularBusAssignmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegularBusAssignmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RegularBusAssignmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegularBusAssignmentPayload>
          }
          findFirst: {
            args: Prisma.RegularBusAssignmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegularBusAssignmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RegularBusAssignmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegularBusAssignmentPayload>
          }
          findMany: {
            args: Prisma.RegularBusAssignmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegularBusAssignmentPayload>[]
          }
          create: {
            args: Prisma.RegularBusAssignmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegularBusAssignmentPayload>
          }
          createMany: {
            args: Prisma.RegularBusAssignmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RegularBusAssignmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegularBusAssignmentPayload>[]
          }
          delete: {
            args: Prisma.RegularBusAssignmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegularBusAssignmentPayload>
          }
          update: {
            args: Prisma.RegularBusAssignmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegularBusAssignmentPayload>
          }
          deleteMany: {
            args: Prisma.RegularBusAssignmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RegularBusAssignmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RegularBusAssignmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegularBusAssignmentPayload>[]
          }
          upsert: {
            args: Prisma.RegularBusAssignmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegularBusAssignmentPayload>
          }
          aggregate: {
            args: Prisma.RegularBusAssignmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegularBusAssignment>
          }
          groupBy: {
            args: Prisma.RegularBusAssignmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<RegularBusAssignmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.RegularBusAssignmentCountArgs<ExtArgs>
            result: $Utils.Optional<RegularBusAssignmentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    quota_Policy?: Quota_PolicyOmit
    fixed?: FixedOmit
    percentage?: PercentageOmit
    stop?: StopOmit
    route?: RouteOmit
    routeStop?: RouteStopOmit
    busAssignment?: BusAssignmentOmit
    regularBusAssignment?: RegularBusAssignmentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type Quota_PolicyCountOutputType
   */

  export type Quota_PolicyCountOutputType = {
    RegularBusAssignments: number
  }

  export type Quota_PolicyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    RegularBusAssignments?: boolean | Quota_PolicyCountOutputTypeCountRegularBusAssignmentsArgs
  }

  // Custom InputTypes
  /**
   * Quota_PolicyCountOutputType without action
   */
  export type Quota_PolicyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_PolicyCountOutputType
     */
    select?: Quota_PolicyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Quota_PolicyCountOutputType without action
   */
  export type Quota_PolicyCountOutputTypeCountRegularBusAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegularBusAssignmentWhereInput
  }


  /**
   * Count Type StopCountOutputType
   */

  export type StopCountOutputType = {
    routesAsStart: number
    routesAsEnd: number
    RouteStops: number
  }

  export type StopCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    routesAsStart?: boolean | StopCountOutputTypeCountRoutesAsStartArgs
    routesAsEnd?: boolean | StopCountOutputTypeCountRoutesAsEndArgs
    RouteStops?: boolean | StopCountOutputTypeCountRouteStopsArgs
  }

  // Custom InputTypes
  /**
   * StopCountOutputType without action
   */
  export type StopCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StopCountOutputType
     */
    select?: StopCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StopCountOutputType without action
   */
  export type StopCountOutputTypeCountRoutesAsStartArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RouteWhereInput
  }

  /**
   * StopCountOutputType without action
   */
  export type StopCountOutputTypeCountRoutesAsEndArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RouteWhereInput
  }

  /**
   * StopCountOutputType without action
   */
  export type StopCountOutputTypeCountRouteStopsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RouteStopWhereInput
  }


  /**
   * Count Type RouteCountOutputType
   */

  export type RouteCountOutputType = {
    RouteStops: number
    BusAssignments: number
  }

  export type RouteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    RouteStops?: boolean | RouteCountOutputTypeCountRouteStopsArgs
    BusAssignments?: boolean | RouteCountOutputTypeCountBusAssignmentsArgs
  }

  // Custom InputTypes
  /**
   * RouteCountOutputType without action
   */
  export type RouteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouteCountOutputType
     */
    select?: RouteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RouteCountOutputType without action
   */
  export type RouteCountOutputTypeCountRouteStopsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RouteStopWhereInput
  }

  /**
   * RouteCountOutputType without action
   */
  export type RouteCountOutputTypeCountBusAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusAssignmentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Quota_Policy
   */

  export type AggregateQuota_Policy = {
    _count: Quota_PolicyCountAggregateOutputType | null
    _min: Quota_PolicyMinAggregateOutputType | null
    _max: Quota_PolicyMaxAggregateOutputType | null
  }

  export type Quota_PolicyMinAggregateOutputType = {
    QuotaPolicyID: string | null
    StartDate: Date | null
    EndDate: Date | null
  }

  export type Quota_PolicyMaxAggregateOutputType = {
    QuotaPolicyID: string | null
    StartDate: Date | null
    EndDate: Date | null
  }

  export type Quota_PolicyCountAggregateOutputType = {
    QuotaPolicyID: number
    StartDate: number
    EndDate: number
    _all: number
  }


  export type Quota_PolicyMinAggregateInputType = {
    QuotaPolicyID?: true
    StartDate?: true
    EndDate?: true
  }

  export type Quota_PolicyMaxAggregateInputType = {
    QuotaPolicyID?: true
    StartDate?: true
    EndDate?: true
  }

  export type Quota_PolicyCountAggregateInputType = {
    QuotaPolicyID?: true
    StartDate?: true
    EndDate?: true
    _all?: true
  }

  export type Quota_PolicyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quota_Policy to aggregate.
     */
    where?: Quota_PolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quota_Policies to fetch.
     */
    orderBy?: Quota_PolicyOrderByWithRelationInput | Quota_PolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Quota_PolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quota_Policies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quota_Policies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Quota_Policies
    **/
    _count?: true | Quota_PolicyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Quota_PolicyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Quota_PolicyMaxAggregateInputType
  }

  export type GetQuota_PolicyAggregateType<T extends Quota_PolicyAggregateArgs> = {
        [P in keyof T & keyof AggregateQuota_Policy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuota_Policy[P]>
      : GetScalarType<T[P], AggregateQuota_Policy[P]>
  }




  export type Quota_PolicyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Quota_PolicyWhereInput
    orderBy?: Quota_PolicyOrderByWithAggregationInput | Quota_PolicyOrderByWithAggregationInput[]
    by: Quota_PolicyScalarFieldEnum[] | Quota_PolicyScalarFieldEnum
    having?: Quota_PolicyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Quota_PolicyCountAggregateInputType | true
    _min?: Quota_PolicyMinAggregateInputType
    _max?: Quota_PolicyMaxAggregateInputType
  }

  export type Quota_PolicyGroupByOutputType = {
    QuotaPolicyID: string
    StartDate: Date
    EndDate: Date
    _count: Quota_PolicyCountAggregateOutputType | null
    _min: Quota_PolicyMinAggregateOutputType | null
    _max: Quota_PolicyMaxAggregateOutputType | null
  }

  type GetQuota_PolicyGroupByPayload<T extends Quota_PolicyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Quota_PolicyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Quota_PolicyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Quota_PolicyGroupByOutputType[P]>
            : GetScalarType<T[P], Quota_PolicyGroupByOutputType[P]>
        }
      >
    >


  export type Quota_PolicySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    QuotaPolicyID?: boolean
    StartDate?: boolean
    EndDate?: boolean
    Fixed?: boolean | Quota_Policy$FixedArgs<ExtArgs>
    Percentage?: boolean | Quota_Policy$PercentageArgs<ExtArgs>
    RegularBusAssignments?: boolean | Quota_Policy$RegularBusAssignmentsArgs<ExtArgs>
    _count?: boolean | Quota_PolicyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quota_Policy"]>

  export type Quota_PolicySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    QuotaPolicyID?: boolean
    StartDate?: boolean
    EndDate?: boolean
  }, ExtArgs["result"]["quota_Policy"]>

  export type Quota_PolicySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    QuotaPolicyID?: boolean
    StartDate?: boolean
    EndDate?: boolean
  }, ExtArgs["result"]["quota_Policy"]>

  export type Quota_PolicySelectScalar = {
    QuotaPolicyID?: boolean
    StartDate?: boolean
    EndDate?: boolean
  }

  export type Quota_PolicyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"QuotaPolicyID" | "StartDate" | "EndDate", ExtArgs["result"]["quota_Policy"]>
  export type Quota_PolicyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Fixed?: boolean | Quota_Policy$FixedArgs<ExtArgs>
    Percentage?: boolean | Quota_Policy$PercentageArgs<ExtArgs>
    RegularBusAssignments?: boolean | Quota_Policy$RegularBusAssignmentsArgs<ExtArgs>
    _count?: boolean | Quota_PolicyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type Quota_PolicyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type Quota_PolicyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $Quota_PolicyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Quota_Policy"
    objects: {
      Fixed: Prisma.$FixedPayload<ExtArgs> | null
      Percentage: Prisma.$PercentagePayload<ExtArgs> | null
      RegularBusAssignments: Prisma.$RegularBusAssignmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      QuotaPolicyID: string
      StartDate: Date
      EndDate: Date
    }, ExtArgs["result"]["quota_Policy"]>
    composites: {}
  }

  type Quota_PolicyGetPayload<S extends boolean | null | undefined | Quota_PolicyDefaultArgs> = $Result.GetResult<Prisma.$Quota_PolicyPayload, S>

  type Quota_PolicyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<Quota_PolicyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Quota_PolicyCountAggregateInputType | true
    }

  export interface Quota_PolicyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Quota_Policy'], meta: { name: 'Quota_Policy' } }
    /**
     * Find zero or one Quota_Policy that matches the filter.
     * @param {Quota_PolicyFindUniqueArgs} args - Arguments to find a Quota_Policy
     * @example
     * // Get one Quota_Policy
     * const quota_Policy = await prisma.quota_Policy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Quota_PolicyFindUniqueArgs>(args: SelectSubset<T, Quota_PolicyFindUniqueArgs<ExtArgs>>): Prisma__Quota_PolicyClient<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Quota_Policy that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {Quota_PolicyFindUniqueOrThrowArgs} args - Arguments to find a Quota_Policy
     * @example
     * // Get one Quota_Policy
     * const quota_Policy = await prisma.quota_Policy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Quota_PolicyFindUniqueOrThrowArgs>(args: SelectSubset<T, Quota_PolicyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Quota_PolicyClient<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Quota_Policy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Quota_PolicyFindFirstArgs} args - Arguments to find a Quota_Policy
     * @example
     * // Get one Quota_Policy
     * const quota_Policy = await prisma.quota_Policy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Quota_PolicyFindFirstArgs>(args?: SelectSubset<T, Quota_PolicyFindFirstArgs<ExtArgs>>): Prisma__Quota_PolicyClient<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Quota_Policy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Quota_PolicyFindFirstOrThrowArgs} args - Arguments to find a Quota_Policy
     * @example
     * // Get one Quota_Policy
     * const quota_Policy = await prisma.quota_Policy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Quota_PolicyFindFirstOrThrowArgs>(args?: SelectSubset<T, Quota_PolicyFindFirstOrThrowArgs<ExtArgs>>): Prisma__Quota_PolicyClient<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Quota_Policies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Quota_PolicyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Quota_Policies
     * const quota_Policies = await prisma.quota_Policy.findMany()
     * 
     * // Get first 10 Quota_Policies
     * const quota_Policies = await prisma.quota_Policy.findMany({ take: 10 })
     * 
     * // Only select the `QuotaPolicyID`
     * const quota_PolicyWithQuotaPolicyIDOnly = await prisma.quota_Policy.findMany({ select: { QuotaPolicyID: true } })
     * 
     */
    findMany<T extends Quota_PolicyFindManyArgs>(args?: SelectSubset<T, Quota_PolicyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Quota_Policy.
     * @param {Quota_PolicyCreateArgs} args - Arguments to create a Quota_Policy.
     * @example
     * // Create one Quota_Policy
     * const Quota_Policy = await prisma.quota_Policy.create({
     *   data: {
     *     // ... data to create a Quota_Policy
     *   }
     * })
     * 
     */
    create<T extends Quota_PolicyCreateArgs>(args: SelectSubset<T, Quota_PolicyCreateArgs<ExtArgs>>): Prisma__Quota_PolicyClient<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Quota_Policies.
     * @param {Quota_PolicyCreateManyArgs} args - Arguments to create many Quota_Policies.
     * @example
     * // Create many Quota_Policies
     * const quota_Policy = await prisma.quota_Policy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Quota_PolicyCreateManyArgs>(args?: SelectSubset<T, Quota_PolicyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Quota_Policies and returns the data saved in the database.
     * @param {Quota_PolicyCreateManyAndReturnArgs} args - Arguments to create many Quota_Policies.
     * @example
     * // Create many Quota_Policies
     * const quota_Policy = await prisma.quota_Policy.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Quota_Policies and only return the `QuotaPolicyID`
     * const quota_PolicyWithQuotaPolicyIDOnly = await prisma.quota_Policy.createManyAndReturn({
     *   select: { QuotaPolicyID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends Quota_PolicyCreateManyAndReturnArgs>(args?: SelectSubset<T, Quota_PolicyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Quota_Policy.
     * @param {Quota_PolicyDeleteArgs} args - Arguments to delete one Quota_Policy.
     * @example
     * // Delete one Quota_Policy
     * const Quota_Policy = await prisma.quota_Policy.delete({
     *   where: {
     *     // ... filter to delete one Quota_Policy
     *   }
     * })
     * 
     */
    delete<T extends Quota_PolicyDeleteArgs>(args: SelectSubset<T, Quota_PolicyDeleteArgs<ExtArgs>>): Prisma__Quota_PolicyClient<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Quota_Policy.
     * @param {Quota_PolicyUpdateArgs} args - Arguments to update one Quota_Policy.
     * @example
     * // Update one Quota_Policy
     * const quota_Policy = await prisma.quota_Policy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Quota_PolicyUpdateArgs>(args: SelectSubset<T, Quota_PolicyUpdateArgs<ExtArgs>>): Prisma__Quota_PolicyClient<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Quota_Policies.
     * @param {Quota_PolicyDeleteManyArgs} args - Arguments to filter Quota_Policies to delete.
     * @example
     * // Delete a few Quota_Policies
     * const { count } = await prisma.quota_Policy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Quota_PolicyDeleteManyArgs>(args?: SelectSubset<T, Quota_PolicyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quota_Policies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Quota_PolicyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Quota_Policies
     * const quota_Policy = await prisma.quota_Policy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Quota_PolicyUpdateManyArgs>(args: SelectSubset<T, Quota_PolicyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quota_Policies and returns the data updated in the database.
     * @param {Quota_PolicyUpdateManyAndReturnArgs} args - Arguments to update many Quota_Policies.
     * @example
     * // Update many Quota_Policies
     * const quota_Policy = await prisma.quota_Policy.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Quota_Policies and only return the `QuotaPolicyID`
     * const quota_PolicyWithQuotaPolicyIDOnly = await prisma.quota_Policy.updateManyAndReturn({
     *   select: { QuotaPolicyID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends Quota_PolicyUpdateManyAndReturnArgs>(args: SelectSubset<T, Quota_PolicyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Quota_Policy.
     * @param {Quota_PolicyUpsertArgs} args - Arguments to update or create a Quota_Policy.
     * @example
     * // Update or create a Quota_Policy
     * const quota_Policy = await prisma.quota_Policy.upsert({
     *   create: {
     *     // ... data to create a Quota_Policy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Quota_Policy we want to update
     *   }
     * })
     */
    upsert<T extends Quota_PolicyUpsertArgs>(args: SelectSubset<T, Quota_PolicyUpsertArgs<ExtArgs>>): Prisma__Quota_PolicyClient<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Quota_Policies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Quota_PolicyCountArgs} args - Arguments to filter Quota_Policies to count.
     * @example
     * // Count the number of Quota_Policies
     * const count = await prisma.quota_Policy.count({
     *   where: {
     *     // ... the filter for the Quota_Policies we want to count
     *   }
     * })
    **/
    count<T extends Quota_PolicyCountArgs>(
      args?: Subset<T, Quota_PolicyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Quota_PolicyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Quota_Policy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Quota_PolicyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Quota_PolicyAggregateArgs>(args: Subset<T, Quota_PolicyAggregateArgs>): Prisma.PrismaPromise<GetQuota_PolicyAggregateType<T>>

    /**
     * Group by Quota_Policy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Quota_PolicyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Quota_PolicyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Quota_PolicyGroupByArgs['orderBy'] }
        : { orderBy?: Quota_PolicyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Quota_PolicyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuota_PolicyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Quota_Policy model
   */
  readonly fields: Quota_PolicyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Quota_Policy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Quota_PolicyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Fixed<T extends Quota_Policy$FixedArgs<ExtArgs> = {}>(args?: Subset<T, Quota_Policy$FixedArgs<ExtArgs>>): Prisma__FixedClient<$Result.GetResult<Prisma.$FixedPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    Percentage<T extends Quota_Policy$PercentageArgs<ExtArgs> = {}>(args?: Subset<T, Quota_Policy$PercentageArgs<ExtArgs>>): Prisma__PercentageClient<$Result.GetResult<Prisma.$PercentagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    RegularBusAssignments<T extends Quota_Policy$RegularBusAssignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Quota_Policy$RegularBusAssignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegularBusAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Quota_Policy model
   */
  interface Quota_PolicyFieldRefs {
    readonly QuotaPolicyID: FieldRef<"Quota_Policy", 'String'>
    readonly StartDate: FieldRef<"Quota_Policy", 'DateTime'>
    readonly EndDate: FieldRef<"Quota_Policy", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Quota_Policy findUnique
   */
  export type Quota_PolicyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_Policy
     */
    select?: Quota_PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quota_Policy
     */
    omit?: Quota_PolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Quota_PolicyInclude<ExtArgs> | null
    /**
     * Filter, which Quota_Policy to fetch.
     */
    where: Quota_PolicyWhereUniqueInput
  }

  /**
   * Quota_Policy findUniqueOrThrow
   */
  export type Quota_PolicyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_Policy
     */
    select?: Quota_PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quota_Policy
     */
    omit?: Quota_PolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Quota_PolicyInclude<ExtArgs> | null
    /**
     * Filter, which Quota_Policy to fetch.
     */
    where: Quota_PolicyWhereUniqueInput
  }

  /**
   * Quota_Policy findFirst
   */
  export type Quota_PolicyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_Policy
     */
    select?: Quota_PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quota_Policy
     */
    omit?: Quota_PolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Quota_PolicyInclude<ExtArgs> | null
    /**
     * Filter, which Quota_Policy to fetch.
     */
    where?: Quota_PolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quota_Policies to fetch.
     */
    orderBy?: Quota_PolicyOrderByWithRelationInput | Quota_PolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quota_Policies.
     */
    cursor?: Quota_PolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quota_Policies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quota_Policies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quota_Policies.
     */
    distinct?: Quota_PolicyScalarFieldEnum | Quota_PolicyScalarFieldEnum[]
  }

  /**
   * Quota_Policy findFirstOrThrow
   */
  export type Quota_PolicyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_Policy
     */
    select?: Quota_PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quota_Policy
     */
    omit?: Quota_PolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Quota_PolicyInclude<ExtArgs> | null
    /**
     * Filter, which Quota_Policy to fetch.
     */
    where?: Quota_PolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quota_Policies to fetch.
     */
    orderBy?: Quota_PolicyOrderByWithRelationInput | Quota_PolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quota_Policies.
     */
    cursor?: Quota_PolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quota_Policies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quota_Policies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quota_Policies.
     */
    distinct?: Quota_PolicyScalarFieldEnum | Quota_PolicyScalarFieldEnum[]
  }

  /**
   * Quota_Policy findMany
   */
  export type Quota_PolicyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_Policy
     */
    select?: Quota_PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quota_Policy
     */
    omit?: Quota_PolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Quota_PolicyInclude<ExtArgs> | null
    /**
     * Filter, which Quota_Policies to fetch.
     */
    where?: Quota_PolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quota_Policies to fetch.
     */
    orderBy?: Quota_PolicyOrderByWithRelationInput | Quota_PolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Quota_Policies.
     */
    cursor?: Quota_PolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quota_Policies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quota_Policies.
     */
    skip?: number
    distinct?: Quota_PolicyScalarFieldEnum | Quota_PolicyScalarFieldEnum[]
  }

  /**
   * Quota_Policy create
   */
  export type Quota_PolicyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_Policy
     */
    select?: Quota_PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quota_Policy
     */
    omit?: Quota_PolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Quota_PolicyInclude<ExtArgs> | null
    /**
     * The data needed to create a Quota_Policy.
     */
    data: XOR<Quota_PolicyCreateInput, Quota_PolicyUncheckedCreateInput>
  }

  /**
   * Quota_Policy createMany
   */
  export type Quota_PolicyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Quota_Policies.
     */
    data: Quota_PolicyCreateManyInput | Quota_PolicyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Quota_Policy createManyAndReturn
   */
  export type Quota_PolicyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_Policy
     */
    select?: Quota_PolicySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Quota_Policy
     */
    omit?: Quota_PolicyOmit<ExtArgs> | null
    /**
     * The data used to create many Quota_Policies.
     */
    data: Quota_PolicyCreateManyInput | Quota_PolicyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Quota_Policy update
   */
  export type Quota_PolicyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_Policy
     */
    select?: Quota_PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quota_Policy
     */
    omit?: Quota_PolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Quota_PolicyInclude<ExtArgs> | null
    /**
     * The data needed to update a Quota_Policy.
     */
    data: XOR<Quota_PolicyUpdateInput, Quota_PolicyUncheckedUpdateInput>
    /**
     * Choose, which Quota_Policy to update.
     */
    where: Quota_PolicyWhereUniqueInput
  }

  /**
   * Quota_Policy updateMany
   */
  export type Quota_PolicyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Quota_Policies.
     */
    data: XOR<Quota_PolicyUpdateManyMutationInput, Quota_PolicyUncheckedUpdateManyInput>
    /**
     * Filter which Quota_Policies to update
     */
    where?: Quota_PolicyWhereInput
    /**
     * Limit how many Quota_Policies to update.
     */
    limit?: number
  }

  /**
   * Quota_Policy updateManyAndReturn
   */
  export type Quota_PolicyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_Policy
     */
    select?: Quota_PolicySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Quota_Policy
     */
    omit?: Quota_PolicyOmit<ExtArgs> | null
    /**
     * The data used to update Quota_Policies.
     */
    data: XOR<Quota_PolicyUpdateManyMutationInput, Quota_PolicyUncheckedUpdateManyInput>
    /**
     * Filter which Quota_Policies to update
     */
    where?: Quota_PolicyWhereInput
    /**
     * Limit how many Quota_Policies to update.
     */
    limit?: number
  }

  /**
   * Quota_Policy upsert
   */
  export type Quota_PolicyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_Policy
     */
    select?: Quota_PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quota_Policy
     */
    omit?: Quota_PolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Quota_PolicyInclude<ExtArgs> | null
    /**
     * The filter to search for the Quota_Policy to update in case it exists.
     */
    where: Quota_PolicyWhereUniqueInput
    /**
     * In case the Quota_Policy found by the `where` argument doesn't exist, create a new Quota_Policy with this data.
     */
    create: XOR<Quota_PolicyCreateInput, Quota_PolicyUncheckedCreateInput>
    /**
     * In case the Quota_Policy was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Quota_PolicyUpdateInput, Quota_PolicyUncheckedUpdateInput>
  }

  /**
   * Quota_Policy delete
   */
  export type Quota_PolicyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_Policy
     */
    select?: Quota_PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quota_Policy
     */
    omit?: Quota_PolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Quota_PolicyInclude<ExtArgs> | null
    /**
     * Filter which Quota_Policy to delete.
     */
    where: Quota_PolicyWhereUniqueInput
  }

  /**
   * Quota_Policy deleteMany
   */
  export type Quota_PolicyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quota_Policies to delete
     */
    where?: Quota_PolicyWhereInput
    /**
     * Limit how many Quota_Policies to delete.
     */
    limit?: number
  }

  /**
   * Quota_Policy.Fixed
   */
  export type Quota_Policy$FixedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fixed
     */
    select?: FixedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fixed
     */
    omit?: FixedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedInclude<ExtArgs> | null
    where?: FixedWhereInput
  }

  /**
   * Quota_Policy.Percentage
   */
  export type Quota_Policy$PercentageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Percentage
     */
    select?: PercentageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Percentage
     */
    omit?: PercentageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PercentageInclude<ExtArgs> | null
    where?: PercentageWhereInput
  }

  /**
   * Quota_Policy.RegularBusAssignments
   */
  export type Quota_Policy$RegularBusAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegularBusAssignment
     */
    select?: RegularBusAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegularBusAssignment
     */
    omit?: RegularBusAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegularBusAssignmentInclude<ExtArgs> | null
    where?: RegularBusAssignmentWhereInput
    orderBy?: RegularBusAssignmentOrderByWithRelationInput | RegularBusAssignmentOrderByWithRelationInput[]
    cursor?: RegularBusAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RegularBusAssignmentScalarFieldEnum | RegularBusAssignmentScalarFieldEnum[]
  }

  /**
   * Quota_Policy without action
   */
  export type Quota_PolicyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_Policy
     */
    select?: Quota_PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quota_Policy
     */
    omit?: Quota_PolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Quota_PolicyInclude<ExtArgs> | null
  }


  /**
   * Model Fixed
   */

  export type AggregateFixed = {
    _count: FixedCountAggregateOutputType | null
    _avg: FixedAvgAggregateOutputType | null
    _sum: FixedSumAggregateOutputType | null
    _min: FixedMinAggregateOutputType | null
    _max: FixedMaxAggregateOutputType | null
  }

  export type FixedAvgAggregateOutputType = {
    Quota: number | null
  }

  export type FixedSumAggregateOutputType = {
    Quota: number | null
  }

  export type FixedMinAggregateOutputType = {
    FQuotaPolicyID: string | null
    Quota: number | null
  }

  export type FixedMaxAggregateOutputType = {
    FQuotaPolicyID: string | null
    Quota: number | null
  }

  export type FixedCountAggregateOutputType = {
    FQuotaPolicyID: number
    Quota: number
    _all: number
  }


  export type FixedAvgAggregateInputType = {
    Quota?: true
  }

  export type FixedSumAggregateInputType = {
    Quota?: true
  }

  export type FixedMinAggregateInputType = {
    FQuotaPolicyID?: true
    Quota?: true
  }

  export type FixedMaxAggregateInputType = {
    FQuotaPolicyID?: true
    Quota?: true
  }

  export type FixedCountAggregateInputType = {
    FQuotaPolicyID?: true
    Quota?: true
    _all?: true
  }

  export type FixedAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fixed to aggregate.
     */
    where?: FixedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fixeds to fetch.
     */
    orderBy?: FixedOrderByWithRelationInput | FixedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FixedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fixeds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fixeds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Fixeds
    **/
    _count?: true | FixedCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FixedAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FixedSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FixedMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FixedMaxAggregateInputType
  }

  export type GetFixedAggregateType<T extends FixedAggregateArgs> = {
        [P in keyof T & keyof AggregateFixed]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFixed[P]>
      : GetScalarType<T[P], AggregateFixed[P]>
  }




  export type FixedGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FixedWhereInput
    orderBy?: FixedOrderByWithAggregationInput | FixedOrderByWithAggregationInput[]
    by: FixedScalarFieldEnum[] | FixedScalarFieldEnum
    having?: FixedScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FixedCountAggregateInputType | true
    _avg?: FixedAvgAggregateInputType
    _sum?: FixedSumAggregateInputType
    _min?: FixedMinAggregateInputType
    _max?: FixedMaxAggregateInputType
  }

  export type FixedGroupByOutputType = {
    FQuotaPolicyID: string
    Quota: number
    _count: FixedCountAggregateOutputType | null
    _avg: FixedAvgAggregateOutputType | null
    _sum: FixedSumAggregateOutputType | null
    _min: FixedMinAggregateOutputType | null
    _max: FixedMaxAggregateOutputType | null
  }

  type GetFixedGroupByPayload<T extends FixedGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FixedGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FixedGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FixedGroupByOutputType[P]>
            : GetScalarType<T[P], FixedGroupByOutputType[P]>
        }
      >
    >


  export type FixedSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    FQuotaPolicyID?: boolean
    Quota?: boolean
    quotaPolicy?: boolean | Quota_PolicyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fixed"]>

  export type FixedSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    FQuotaPolicyID?: boolean
    Quota?: boolean
    quotaPolicy?: boolean | Quota_PolicyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fixed"]>

  export type FixedSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    FQuotaPolicyID?: boolean
    Quota?: boolean
    quotaPolicy?: boolean | Quota_PolicyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fixed"]>

  export type FixedSelectScalar = {
    FQuotaPolicyID?: boolean
    Quota?: boolean
  }

  export type FixedOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"FQuotaPolicyID" | "Quota", ExtArgs["result"]["fixed"]>
  export type FixedInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quotaPolicy?: boolean | Quota_PolicyDefaultArgs<ExtArgs>
  }
  export type FixedIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quotaPolicy?: boolean | Quota_PolicyDefaultArgs<ExtArgs>
  }
  export type FixedIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quotaPolicy?: boolean | Quota_PolicyDefaultArgs<ExtArgs>
  }

  export type $FixedPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Fixed"
    objects: {
      quotaPolicy: Prisma.$Quota_PolicyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      FQuotaPolicyID: string
      Quota: number
    }, ExtArgs["result"]["fixed"]>
    composites: {}
  }

  type FixedGetPayload<S extends boolean | null | undefined | FixedDefaultArgs> = $Result.GetResult<Prisma.$FixedPayload, S>

  type FixedCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FixedFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FixedCountAggregateInputType | true
    }

  export interface FixedDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Fixed'], meta: { name: 'Fixed' } }
    /**
     * Find zero or one Fixed that matches the filter.
     * @param {FixedFindUniqueArgs} args - Arguments to find a Fixed
     * @example
     * // Get one Fixed
     * const fixed = await prisma.fixed.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FixedFindUniqueArgs>(args: SelectSubset<T, FixedFindUniqueArgs<ExtArgs>>): Prisma__FixedClient<$Result.GetResult<Prisma.$FixedPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Fixed that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FixedFindUniqueOrThrowArgs} args - Arguments to find a Fixed
     * @example
     * // Get one Fixed
     * const fixed = await prisma.fixed.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FixedFindUniqueOrThrowArgs>(args: SelectSubset<T, FixedFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FixedClient<$Result.GetResult<Prisma.$FixedPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fixed that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FixedFindFirstArgs} args - Arguments to find a Fixed
     * @example
     * // Get one Fixed
     * const fixed = await prisma.fixed.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FixedFindFirstArgs>(args?: SelectSubset<T, FixedFindFirstArgs<ExtArgs>>): Prisma__FixedClient<$Result.GetResult<Prisma.$FixedPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fixed that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FixedFindFirstOrThrowArgs} args - Arguments to find a Fixed
     * @example
     * // Get one Fixed
     * const fixed = await prisma.fixed.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FixedFindFirstOrThrowArgs>(args?: SelectSubset<T, FixedFindFirstOrThrowArgs<ExtArgs>>): Prisma__FixedClient<$Result.GetResult<Prisma.$FixedPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Fixeds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FixedFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Fixeds
     * const fixeds = await prisma.fixed.findMany()
     * 
     * // Get first 10 Fixeds
     * const fixeds = await prisma.fixed.findMany({ take: 10 })
     * 
     * // Only select the `FQuotaPolicyID`
     * const fixedWithFQuotaPolicyIDOnly = await prisma.fixed.findMany({ select: { FQuotaPolicyID: true } })
     * 
     */
    findMany<T extends FixedFindManyArgs>(args?: SelectSubset<T, FixedFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FixedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Fixed.
     * @param {FixedCreateArgs} args - Arguments to create a Fixed.
     * @example
     * // Create one Fixed
     * const Fixed = await prisma.fixed.create({
     *   data: {
     *     // ... data to create a Fixed
     *   }
     * })
     * 
     */
    create<T extends FixedCreateArgs>(args: SelectSubset<T, FixedCreateArgs<ExtArgs>>): Prisma__FixedClient<$Result.GetResult<Prisma.$FixedPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Fixeds.
     * @param {FixedCreateManyArgs} args - Arguments to create many Fixeds.
     * @example
     * // Create many Fixeds
     * const fixed = await prisma.fixed.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FixedCreateManyArgs>(args?: SelectSubset<T, FixedCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Fixeds and returns the data saved in the database.
     * @param {FixedCreateManyAndReturnArgs} args - Arguments to create many Fixeds.
     * @example
     * // Create many Fixeds
     * const fixed = await prisma.fixed.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Fixeds and only return the `FQuotaPolicyID`
     * const fixedWithFQuotaPolicyIDOnly = await prisma.fixed.createManyAndReturn({
     *   select: { FQuotaPolicyID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FixedCreateManyAndReturnArgs>(args?: SelectSubset<T, FixedCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FixedPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Fixed.
     * @param {FixedDeleteArgs} args - Arguments to delete one Fixed.
     * @example
     * // Delete one Fixed
     * const Fixed = await prisma.fixed.delete({
     *   where: {
     *     // ... filter to delete one Fixed
     *   }
     * })
     * 
     */
    delete<T extends FixedDeleteArgs>(args: SelectSubset<T, FixedDeleteArgs<ExtArgs>>): Prisma__FixedClient<$Result.GetResult<Prisma.$FixedPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Fixed.
     * @param {FixedUpdateArgs} args - Arguments to update one Fixed.
     * @example
     * // Update one Fixed
     * const fixed = await prisma.fixed.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FixedUpdateArgs>(args: SelectSubset<T, FixedUpdateArgs<ExtArgs>>): Prisma__FixedClient<$Result.GetResult<Prisma.$FixedPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Fixeds.
     * @param {FixedDeleteManyArgs} args - Arguments to filter Fixeds to delete.
     * @example
     * // Delete a few Fixeds
     * const { count } = await prisma.fixed.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FixedDeleteManyArgs>(args?: SelectSubset<T, FixedDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fixeds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FixedUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Fixeds
     * const fixed = await prisma.fixed.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FixedUpdateManyArgs>(args: SelectSubset<T, FixedUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fixeds and returns the data updated in the database.
     * @param {FixedUpdateManyAndReturnArgs} args - Arguments to update many Fixeds.
     * @example
     * // Update many Fixeds
     * const fixed = await prisma.fixed.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Fixeds and only return the `FQuotaPolicyID`
     * const fixedWithFQuotaPolicyIDOnly = await prisma.fixed.updateManyAndReturn({
     *   select: { FQuotaPolicyID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FixedUpdateManyAndReturnArgs>(args: SelectSubset<T, FixedUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FixedPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Fixed.
     * @param {FixedUpsertArgs} args - Arguments to update or create a Fixed.
     * @example
     * // Update or create a Fixed
     * const fixed = await prisma.fixed.upsert({
     *   create: {
     *     // ... data to create a Fixed
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Fixed we want to update
     *   }
     * })
     */
    upsert<T extends FixedUpsertArgs>(args: SelectSubset<T, FixedUpsertArgs<ExtArgs>>): Prisma__FixedClient<$Result.GetResult<Prisma.$FixedPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Fixeds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FixedCountArgs} args - Arguments to filter Fixeds to count.
     * @example
     * // Count the number of Fixeds
     * const count = await prisma.fixed.count({
     *   where: {
     *     // ... the filter for the Fixeds we want to count
     *   }
     * })
    **/
    count<T extends FixedCountArgs>(
      args?: Subset<T, FixedCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FixedCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Fixed.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FixedAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FixedAggregateArgs>(args: Subset<T, FixedAggregateArgs>): Prisma.PrismaPromise<GetFixedAggregateType<T>>

    /**
     * Group by Fixed.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FixedGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FixedGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FixedGroupByArgs['orderBy'] }
        : { orderBy?: FixedGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FixedGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFixedGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Fixed model
   */
  readonly fields: FixedFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Fixed.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FixedClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quotaPolicy<T extends Quota_PolicyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, Quota_PolicyDefaultArgs<ExtArgs>>): Prisma__Quota_PolicyClient<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Fixed model
   */
  interface FixedFieldRefs {
    readonly FQuotaPolicyID: FieldRef<"Fixed", 'String'>
    readonly Quota: FieldRef<"Fixed", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Fixed findUnique
   */
  export type FixedFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fixed
     */
    select?: FixedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fixed
     */
    omit?: FixedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedInclude<ExtArgs> | null
    /**
     * Filter, which Fixed to fetch.
     */
    where: FixedWhereUniqueInput
  }

  /**
   * Fixed findUniqueOrThrow
   */
  export type FixedFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fixed
     */
    select?: FixedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fixed
     */
    omit?: FixedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedInclude<ExtArgs> | null
    /**
     * Filter, which Fixed to fetch.
     */
    where: FixedWhereUniqueInput
  }

  /**
   * Fixed findFirst
   */
  export type FixedFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fixed
     */
    select?: FixedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fixed
     */
    omit?: FixedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedInclude<ExtArgs> | null
    /**
     * Filter, which Fixed to fetch.
     */
    where?: FixedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fixeds to fetch.
     */
    orderBy?: FixedOrderByWithRelationInput | FixedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fixeds.
     */
    cursor?: FixedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fixeds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fixeds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fixeds.
     */
    distinct?: FixedScalarFieldEnum | FixedScalarFieldEnum[]
  }

  /**
   * Fixed findFirstOrThrow
   */
  export type FixedFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fixed
     */
    select?: FixedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fixed
     */
    omit?: FixedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedInclude<ExtArgs> | null
    /**
     * Filter, which Fixed to fetch.
     */
    where?: FixedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fixeds to fetch.
     */
    orderBy?: FixedOrderByWithRelationInput | FixedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fixeds.
     */
    cursor?: FixedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fixeds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fixeds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fixeds.
     */
    distinct?: FixedScalarFieldEnum | FixedScalarFieldEnum[]
  }

  /**
   * Fixed findMany
   */
  export type FixedFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fixed
     */
    select?: FixedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fixed
     */
    omit?: FixedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedInclude<ExtArgs> | null
    /**
     * Filter, which Fixeds to fetch.
     */
    where?: FixedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fixeds to fetch.
     */
    orderBy?: FixedOrderByWithRelationInput | FixedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Fixeds.
     */
    cursor?: FixedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fixeds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fixeds.
     */
    skip?: number
    distinct?: FixedScalarFieldEnum | FixedScalarFieldEnum[]
  }

  /**
   * Fixed create
   */
  export type FixedCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fixed
     */
    select?: FixedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fixed
     */
    omit?: FixedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedInclude<ExtArgs> | null
    /**
     * The data needed to create a Fixed.
     */
    data: XOR<FixedCreateInput, FixedUncheckedCreateInput>
  }

  /**
   * Fixed createMany
   */
  export type FixedCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Fixeds.
     */
    data: FixedCreateManyInput | FixedCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Fixed createManyAndReturn
   */
  export type FixedCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fixed
     */
    select?: FixedSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Fixed
     */
    omit?: FixedOmit<ExtArgs> | null
    /**
     * The data used to create many Fixeds.
     */
    data: FixedCreateManyInput | FixedCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Fixed update
   */
  export type FixedUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fixed
     */
    select?: FixedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fixed
     */
    omit?: FixedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedInclude<ExtArgs> | null
    /**
     * The data needed to update a Fixed.
     */
    data: XOR<FixedUpdateInput, FixedUncheckedUpdateInput>
    /**
     * Choose, which Fixed to update.
     */
    where: FixedWhereUniqueInput
  }

  /**
   * Fixed updateMany
   */
  export type FixedUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Fixeds.
     */
    data: XOR<FixedUpdateManyMutationInput, FixedUncheckedUpdateManyInput>
    /**
     * Filter which Fixeds to update
     */
    where?: FixedWhereInput
    /**
     * Limit how many Fixeds to update.
     */
    limit?: number
  }

  /**
   * Fixed updateManyAndReturn
   */
  export type FixedUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fixed
     */
    select?: FixedSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Fixed
     */
    omit?: FixedOmit<ExtArgs> | null
    /**
     * The data used to update Fixeds.
     */
    data: XOR<FixedUpdateManyMutationInput, FixedUncheckedUpdateManyInput>
    /**
     * Filter which Fixeds to update
     */
    where?: FixedWhereInput
    /**
     * Limit how many Fixeds to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Fixed upsert
   */
  export type FixedUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fixed
     */
    select?: FixedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fixed
     */
    omit?: FixedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedInclude<ExtArgs> | null
    /**
     * The filter to search for the Fixed to update in case it exists.
     */
    where: FixedWhereUniqueInput
    /**
     * In case the Fixed found by the `where` argument doesn't exist, create a new Fixed with this data.
     */
    create: XOR<FixedCreateInput, FixedUncheckedCreateInput>
    /**
     * In case the Fixed was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FixedUpdateInput, FixedUncheckedUpdateInput>
  }

  /**
   * Fixed delete
   */
  export type FixedDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fixed
     */
    select?: FixedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fixed
     */
    omit?: FixedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedInclude<ExtArgs> | null
    /**
     * Filter which Fixed to delete.
     */
    where: FixedWhereUniqueInput
  }

  /**
   * Fixed deleteMany
   */
  export type FixedDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fixeds to delete
     */
    where?: FixedWhereInput
    /**
     * Limit how many Fixeds to delete.
     */
    limit?: number
  }

  /**
   * Fixed without action
   */
  export type FixedDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fixed
     */
    select?: FixedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fixed
     */
    omit?: FixedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedInclude<ExtArgs> | null
  }


  /**
   * Model Percentage
   */

  export type AggregatePercentage = {
    _count: PercentageCountAggregateOutputType | null
    _avg: PercentageAvgAggregateOutputType | null
    _sum: PercentageSumAggregateOutputType | null
    _min: PercentageMinAggregateOutputType | null
    _max: PercentageMaxAggregateOutputType | null
  }

  export type PercentageAvgAggregateOutputType = {
    Percentage: number | null
  }

  export type PercentageSumAggregateOutputType = {
    Percentage: number | null
  }

  export type PercentageMinAggregateOutputType = {
    PQuotaPolicyID: string | null
    Percentage: number | null
  }

  export type PercentageMaxAggregateOutputType = {
    PQuotaPolicyID: string | null
    Percentage: number | null
  }

  export type PercentageCountAggregateOutputType = {
    PQuotaPolicyID: number
    Percentage: number
    _all: number
  }


  export type PercentageAvgAggregateInputType = {
    Percentage?: true
  }

  export type PercentageSumAggregateInputType = {
    Percentage?: true
  }

  export type PercentageMinAggregateInputType = {
    PQuotaPolicyID?: true
    Percentage?: true
  }

  export type PercentageMaxAggregateInputType = {
    PQuotaPolicyID?: true
    Percentage?: true
  }

  export type PercentageCountAggregateInputType = {
    PQuotaPolicyID?: true
    Percentage?: true
    _all?: true
  }

  export type PercentageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Percentage to aggregate.
     */
    where?: PercentageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Percentages to fetch.
     */
    orderBy?: PercentageOrderByWithRelationInput | PercentageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PercentageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Percentages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Percentages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Percentages
    **/
    _count?: true | PercentageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PercentageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PercentageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PercentageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PercentageMaxAggregateInputType
  }

  export type GetPercentageAggregateType<T extends PercentageAggregateArgs> = {
        [P in keyof T & keyof AggregatePercentage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePercentage[P]>
      : GetScalarType<T[P], AggregatePercentage[P]>
  }




  export type PercentageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PercentageWhereInput
    orderBy?: PercentageOrderByWithAggregationInput | PercentageOrderByWithAggregationInput[]
    by: PercentageScalarFieldEnum[] | PercentageScalarFieldEnum
    having?: PercentageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PercentageCountAggregateInputType | true
    _avg?: PercentageAvgAggregateInputType
    _sum?: PercentageSumAggregateInputType
    _min?: PercentageMinAggregateInputType
    _max?: PercentageMaxAggregateInputType
  }

  export type PercentageGroupByOutputType = {
    PQuotaPolicyID: string
    Percentage: number
    _count: PercentageCountAggregateOutputType | null
    _avg: PercentageAvgAggregateOutputType | null
    _sum: PercentageSumAggregateOutputType | null
    _min: PercentageMinAggregateOutputType | null
    _max: PercentageMaxAggregateOutputType | null
  }

  type GetPercentageGroupByPayload<T extends PercentageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PercentageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PercentageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PercentageGroupByOutputType[P]>
            : GetScalarType<T[P], PercentageGroupByOutputType[P]>
        }
      >
    >


  export type PercentageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PQuotaPolicyID?: boolean
    Percentage?: boolean
    quotaPolicy?: boolean | Quota_PolicyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["percentage"]>

  export type PercentageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PQuotaPolicyID?: boolean
    Percentage?: boolean
    quotaPolicy?: boolean | Quota_PolicyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["percentage"]>

  export type PercentageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PQuotaPolicyID?: boolean
    Percentage?: boolean
    quotaPolicy?: boolean | Quota_PolicyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["percentage"]>

  export type PercentageSelectScalar = {
    PQuotaPolicyID?: boolean
    Percentage?: boolean
  }

  export type PercentageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"PQuotaPolicyID" | "Percentage", ExtArgs["result"]["percentage"]>
  export type PercentageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quotaPolicy?: boolean | Quota_PolicyDefaultArgs<ExtArgs>
  }
  export type PercentageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quotaPolicy?: boolean | Quota_PolicyDefaultArgs<ExtArgs>
  }
  export type PercentageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quotaPolicy?: boolean | Quota_PolicyDefaultArgs<ExtArgs>
  }

  export type $PercentagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Percentage"
    objects: {
      quotaPolicy: Prisma.$Quota_PolicyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      PQuotaPolicyID: string
      Percentage: number
    }, ExtArgs["result"]["percentage"]>
    composites: {}
  }

  type PercentageGetPayload<S extends boolean | null | undefined | PercentageDefaultArgs> = $Result.GetResult<Prisma.$PercentagePayload, S>

  type PercentageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PercentageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PercentageCountAggregateInputType | true
    }

  export interface PercentageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Percentage'], meta: { name: 'Percentage' } }
    /**
     * Find zero or one Percentage that matches the filter.
     * @param {PercentageFindUniqueArgs} args - Arguments to find a Percentage
     * @example
     * // Get one Percentage
     * const percentage = await prisma.percentage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PercentageFindUniqueArgs>(args: SelectSubset<T, PercentageFindUniqueArgs<ExtArgs>>): Prisma__PercentageClient<$Result.GetResult<Prisma.$PercentagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Percentage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PercentageFindUniqueOrThrowArgs} args - Arguments to find a Percentage
     * @example
     * // Get one Percentage
     * const percentage = await prisma.percentage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PercentageFindUniqueOrThrowArgs>(args: SelectSubset<T, PercentageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PercentageClient<$Result.GetResult<Prisma.$PercentagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Percentage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PercentageFindFirstArgs} args - Arguments to find a Percentage
     * @example
     * // Get one Percentage
     * const percentage = await prisma.percentage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PercentageFindFirstArgs>(args?: SelectSubset<T, PercentageFindFirstArgs<ExtArgs>>): Prisma__PercentageClient<$Result.GetResult<Prisma.$PercentagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Percentage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PercentageFindFirstOrThrowArgs} args - Arguments to find a Percentage
     * @example
     * // Get one Percentage
     * const percentage = await prisma.percentage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PercentageFindFirstOrThrowArgs>(args?: SelectSubset<T, PercentageFindFirstOrThrowArgs<ExtArgs>>): Prisma__PercentageClient<$Result.GetResult<Prisma.$PercentagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Percentages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PercentageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Percentages
     * const percentages = await prisma.percentage.findMany()
     * 
     * // Get first 10 Percentages
     * const percentages = await prisma.percentage.findMany({ take: 10 })
     * 
     * // Only select the `PQuotaPolicyID`
     * const percentageWithPQuotaPolicyIDOnly = await prisma.percentage.findMany({ select: { PQuotaPolicyID: true } })
     * 
     */
    findMany<T extends PercentageFindManyArgs>(args?: SelectSubset<T, PercentageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PercentagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Percentage.
     * @param {PercentageCreateArgs} args - Arguments to create a Percentage.
     * @example
     * // Create one Percentage
     * const Percentage = await prisma.percentage.create({
     *   data: {
     *     // ... data to create a Percentage
     *   }
     * })
     * 
     */
    create<T extends PercentageCreateArgs>(args: SelectSubset<T, PercentageCreateArgs<ExtArgs>>): Prisma__PercentageClient<$Result.GetResult<Prisma.$PercentagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Percentages.
     * @param {PercentageCreateManyArgs} args - Arguments to create many Percentages.
     * @example
     * // Create many Percentages
     * const percentage = await prisma.percentage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PercentageCreateManyArgs>(args?: SelectSubset<T, PercentageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Percentages and returns the data saved in the database.
     * @param {PercentageCreateManyAndReturnArgs} args - Arguments to create many Percentages.
     * @example
     * // Create many Percentages
     * const percentage = await prisma.percentage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Percentages and only return the `PQuotaPolicyID`
     * const percentageWithPQuotaPolicyIDOnly = await prisma.percentage.createManyAndReturn({
     *   select: { PQuotaPolicyID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PercentageCreateManyAndReturnArgs>(args?: SelectSubset<T, PercentageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PercentagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Percentage.
     * @param {PercentageDeleteArgs} args - Arguments to delete one Percentage.
     * @example
     * // Delete one Percentage
     * const Percentage = await prisma.percentage.delete({
     *   where: {
     *     // ... filter to delete one Percentage
     *   }
     * })
     * 
     */
    delete<T extends PercentageDeleteArgs>(args: SelectSubset<T, PercentageDeleteArgs<ExtArgs>>): Prisma__PercentageClient<$Result.GetResult<Prisma.$PercentagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Percentage.
     * @param {PercentageUpdateArgs} args - Arguments to update one Percentage.
     * @example
     * // Update one Percentage
     * const percentage = await prisma.percentage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PercentageUpdateArgs>(args: SelectSubset<T, PercentageUpdateArgs<ExtArgs>>): Prisma__PercentageClient<$Result.GetResult<Prisma.$PercentagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Percentages.
     * @param {PercentageDeleteManyArgs} args - Arguments to filter Percentages to delete.
     * @example
     * // Delete a few Percentages
     * const { count } = await prisma.percentage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PercentageDeleteManyArgs>(args?: SelectSubset<T, PercentageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Percentages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PercentageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Percentages
     * const percentage = await prisma.percentage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PercentageUpdateManyArgs>(args: SelectSubset<T, PercentageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Percentages and returns the data updated in the database.
     * @param {PercentageUpdateManyAndReturnArgs} args - Arguments to update many Percentages.
     * @example
     * // Update many Percentages
     * const percentage = await prisma.percentage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Percentages and only return the `PQuotaPolicyID`
     * const percentageWithPQuotaPolicyIDOnly = await prisma.percentage.updateManyAndReturn({
     *   select: { PQuotaPolicyID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PercentageUpdateManyAndReturnArgs>(args: SelectSubset<T, PercentageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PercentagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Percentage.
     * @param {PercentageUpsertArgs} args - Arguments to update or create a Percentage.
     * @example
     * // Update or create a Percentage
     * const percentage = await prisma.percentage.upsert({
     *   create: {
     *     // ... data to create a Percentage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Percentage we want to update
     *   }
     * })
     */
    upsert<T extends PercentageUpsertArgs>(args: SelectSubset<T, PercentageUpsertArgs<ExtArgs>>): Prisma__PercentageClient<$Result.GetResult<Prisma.$PercentagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Percentages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PercentageCountArgs} args - Arguments to filter Percentages to count.
     * @example
     * // Count the number of Percentages
     * const count = await prisma.percentage.count({
     *   where: {
     *     // ... the filter for the Percentages we want to count
     *   }
     * })
    **/
    count<T extends PercentageCountArgs>(
      args?: Subset<T, PercentageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PercentageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Percentage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PercentageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PercentageAggregateArgs>(args: Subset<T, PercentageAggregateArgs>): Prisma.PrismaPromise<GetPercentageAggregateType<T>>

    /**
     * Group by Percentage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PercentageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PercentageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PercentageGroupByArgs['orderBy'] }
        : { orderBy?: PercentageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PercentageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPercentageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Percentage model
   */
  readonly fields: PercentageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Percentage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PercentageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quotaPolicy<T extends Quota_PolicyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, Quota_PolicyDefaultArgs<ExtArgs>>): Prisma__Quota_PolicyClient<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Percentage model
   */
  interface PercentageFieldRefs {
    readonly PQuotaPolicyID: FieldRef<"Percentage", 'String'>
    readonly Percentage: FieldRef<"Percentage", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Percentage findUnique
   */
  export type PercentageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Percentage
     */
    select?: PercentageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Percentage
     */
    omit?: PercentageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PercentageInclude<ExtArgs> | null
    /**
     * Filter, which Percentage to fetch.
     */
    where: PercentageWhereUniqueInput
  }

  /**
   * Percentage findUniqueOrThrow
   */
  export type PercentageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Percentage
     */
    select?: PercentageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Percentage
     */
    omit?: PercentageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PercentageInclude<ExtArgs> | null
    /**
     * Filter, which Percentage to fetch.
     */
    where: PercentageWhereUniqueInput
  }

  /**
   * Percentage findFirst
   */
  export type PercentageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Percentage
     */
    select?: PercentageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Percentage
     */
    omit?: PercentageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PercentageInclude<ExtArgs> | null
    /**
     * Filter, which Percentage to fetch.
     */
    where?: PercentageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Percentages to fetch.
     */
    orderBy?: PercentageOrderByWithRelationInput | PercentageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Percentages.
     */
    cursor?: PercentageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Percentages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Percentages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Percentages.
     */
    distinct?: PercentageScalarFieldEnum | PercentageScalarFieldEnum[]
  }

  /**
   * Percentage findFirstOrThrow
   */
  export type PercentageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Percentage
     */
    select?: PercentageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Percentage
     */
    omit?: PercentageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PercentageInclude<ExtArgs> | null
    /**
     * Filter, which Percentage to fetch.
     */
    where?: PercentageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Percentages to fetch.
     */
    orderBy?: PercentageOrderByWithRelationInput | PercentageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Percentages.
     */
    cursor?: PercentageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Percentages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Percentages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Percentages.
     */
    distinct?: PercentageScalarFieldEnum | PercentageScalarFieldEnum[]
  }

  /**
   * Percentage findMany
   */
  export type PercentageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Percentage
     */
    select?: PercentageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Percentage
     */
    omit?: PercentageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PercentageInclude<ExtArgs> | null
    /**
     * Filter, which Percentages to fetch.
     */
    where?: PercentageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Percentages to fetch.
     */
    orderBy?: PercentageOrderByWithRelationInput | PercentageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Percentages.
     */
    cursor?: PercentageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Percentages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Percentages.
     */
    skip?: number
    distinct?: PercentageScalarFieldEnum | PercentageScalarFieldEnum[]
  }

  /**
   * Percentage create
   */
  export type PercentageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Percentage
     */
    select?: PercentageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Percentage
     */
    omit?: PercentageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PercentageInclude<ExtArgs> | null
    /**
     * The data needed to create a Percentage.
     */
    data: XOR<PercentageCreateInput, PercentageUncheckedCreateInput>
  }

  /**
   * Percentage createMany
   */
  export type PercentageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Percentages.
     */
    data: PercentageCreateManyInput | PercentageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Percentage createManyAndReturn
   */
  export type PercentageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Percentage
     */
    select?: PercentageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Percentage
     */
    omit?: PercentageOmit<ExtArgs> | null
    /**
     * The data used to create many Percentages.
     */
    data: PercentageCreateManyInput | PercentageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PercentageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Percentage update
   */
  export type PercentageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Percentage
     */
    select?: PercentageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Percentage
     */
    omit?: PercentageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PercentageInclude<ExtArgs> | null
    /**
     * The data needed to update a Percentage.
     */
    data: XOR<PercentageUpdateInput, PercentageUncheckedUpdateInput>
    /**
     * Choose, which Percentage to update.
     */
    where: PercentageWhereUniqueInput
  }

  /**
   * Percentage updateMany
   */
  export type PercentageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Percentages.
     */
    data: XOR<PercentageUpdateManyMutationInput, PercentageUncheckedUpdateManyInput>
    /**
     * Filter which Percentages to update
     */
    where?: PercentageWhereInput
    /**
     * Limit how many Percentages to update.
     */
    limit?: number
  }

  /**
   * Percentage updateManyAndReturn
   */
  export type PercentageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Percentage
     */
    select?: PercentageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Percentage
     */
    omit?: PercentageOmit<ExtArgs> | null
    /**
     * The data used to update Percentages.
     */
    data: XOR<PercentageUpdateManyMutationInput, PercentageUncheckedUpdateManyInput>
    /**
     * Filter which Percentages to update
     */
    where?: PercentageWhereInput
    /**
     * Limit how many Percentages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PercentageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Percentage upsert
   */
  export type PercentageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Percentage
     */
    select?: PercentageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Percentage
     */
    omit?: PercentageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PercentageInclude<ExtArgs> | null
    /**
     * The filter to search for the Percentage to update in case it exists.
     */
    where: PercentageWhereUniqueInput
    /**
     * In case the Percentage found by the `where` argument doesn't exist, create a new Percentage with this data.
     */
    create: XOR<PercentageCreateInput, PercentageUncheckedCreateInput>
    /**
     * In case the Percentage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PercentageUpdateInput, PercentageUncheckedUpdateInput>
  }

  /**
   * Percentage delete
   */
  export type PercentageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Percentage
     */
    select?: PercentageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Percentage
     */
    omit?: PercentageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PercentageInclude<ExtArgs> | null
    /**
     * Filter which Percentage to delete.
     */
    where: PercentageWhereUniqueInput
  }

  /**
   * Percentage deleteMany
   */
  export type PercentageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Percentages to delete
     */
    where?: PercentageWhereInput
    /**
     * Limit how many Percentages to delete.
     */
    limit?: number
  }

  /**
   * Percentage without action
   */
  export type PercentageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Percentage
     */
    select?: PercentageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Percentage
     */
    omit?: PercentageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PercentageInclude<ExtArgs> | null
  }


  /**
   * Model Stop
   */

  export type AggregateStop = {
    _count: StopCountAggregateOutputType | null
    _min: StopMinAggregateOutputType | null
    _max: StopMaxAggregateOutputType | null
  }

  export type StopMinAggregateOutputType = {
    StopID: string | null
    StopName: string | null
    latitude: string | null
    longitude: string | null
    IsDeleted: boolean | null
  }

  export type StopMaxAggregateOutputType = {
    StopID: string | null
    StopName: string | null
    latitude: string | null
    longitude: string | null
    IsDeleted: boolean | null
  }

  export type StopCountAggregateOutputType = {
    StopID: number
    StopName: number
    latitude: number
    longitude: number
    IsDeleted: number
    _all: number
  }


  export type StopMinAggregateInputType = {
    StopID?: true
    StopName?: true
    latitude?: true
    longitude?: true
    IsDeleted?: true
  }

  export type StopMaxAggregateInputType = {
    StopID?: true
    StopName?: true
    latitude?: true
    longitude?: true
    IsDeleted?: true
  }

  export type StopCountAggregateInputType = {
    StopID?: true
    StopName?: true
    latitude?: true
    longitude?: true
    IsDeleted?: true
    _all?: true
  }

  export type StopAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stop to aggregate.
     */
    where?: StopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stops to fetch.
     */
    orderBy?: StopOrderByWithRelationInput | StopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Stops
    **/
    _count?: true | StopCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StopMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StopMaxAggregateInputType
  }

  export type GetStopAggregateType<T extends StopAggregateArgs> = {
        [P in keyof T & keyof AggregateStop]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStop[P]>
      : GetScalarType<T[P], AggregateStop[P]>
  }




  export type StopGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StopWhereInput
    orderBy?: StopOrderByWithAggregationInput | StopOrderByWithAggregationInput[]
    by: StopScalarFieldEnum[] | StopScalarFieldEnum
    having?: StopScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StopCountAggregateInputType | true
    _min?: StopMinAggregateInputType
    _max?: StopMaxAggregateInputType
  }

  export type StopGroupByOutputType = {
    StopID: string
    StopName: string
    latitude: string
    longitude: string
    IsDeleted: boolean
    _count: StopCountAggregateOutputType | null
    _min: StopMinAggregateOutputType | null
    _max: StopMaxAggregateOutputType | null
  }

  type GetStopGroupByPayload<T extends StopGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StopGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StopGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StopGroupByOutputType[P]>
            : GetScalarType<T[P], StopGroupByOutputType[P]>
        }
      >
    >


  export type StopSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    StopID?: boolean
    StopName?: boolean
    latitude?: boolean
    longitude?: boolean
    IsDeleted?: boolean
    routesAsStart?: boolean | Stop$routesAsStartArgs<ExtArgs>
    routesAsEnd?: boolean | Stop$routesAsEndArgs<ExtArgs>
    RouteStops?: boolean | Stop$RouteStopsArgs<ExtArgs>
    _count?: boolean | StopCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stop"]>

  export type StopSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    StopID?: boolean
    StopName?: boolean
    latitude?: boolean
    longitude?: boolean
    IsDeleted?: boolean
  }, ExtArgs["result"]["stop"]>

  export type StopSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    StopID?: boolean
    StopName?: boolean
    latitude?: boolean
    longitude?: boolean
    IsDeleted?: boolean
  }, ExtArgs["result"]["stop"]>

  export type StopSelectScalar = {
    StopID?: boolean
    StopName?: boolean
    latitude?: boolean
    longitude?: boolean
    IsDeleted?: boolean
  }

  export type StopOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"StopID" | "StopName" | "latitude" | "longitude" | "IsDeleted", ExtArgs["result"]["stop"]>
  export type StopInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    routesAsStart?: boolean | Stop$routesAsStartArgs<ExtArgs>
    routesAsEnd?: boolean | Stop$routesAsEndArgs<ExtArgs>
    RouteStops?: boolean | Stop$RouteStopsArgs<ExtArgs>
    _count?: boolean | StopCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StopIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type StopIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StopPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Stop"
    objects: {
      routesAsStart: Prisma.$RoutePayload<ExtArgs>[]
      routesAsEnd: Prisma.$RoutePayload<ExtArgs>[]
      RouteStops: Prisma.$RouteStopPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      StopID: string
      StopName: string
      latitude: string
      longitude: string
      IsDeleted: boolean
    }, ExtArgs["result"]["stop"]>
    composites: {}
  }

  type StopGetPayload<S extends boolean | null | undefined | StopDefaultArgs> = $Result.GetResult<Prisma.$StopPayload, S>

  type StopCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StopFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StopCountAggregateInputType | true
    }

  export interface StopDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Stop'], meta: { name: 'Stop' } }
    /**
     * Find zero or one Stop that matches the filter.
     * @param {StopFindUniqueArgs} args - Arguments to find a Stop
     * @example
     * // Get one Stop
     * const stop = await prisma.stop.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StopFindUniqueArgs>(args: SelectSubset<T, StopFindUniqueArgs<ExtArgs>>): Prisma__StopClient<$Result.GetResult<Prisma.$StopPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Stop that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StopFindUniqueOrThrowArgs} args - Arguments to find a Stop
     * @example
     * // Get one Stop
     * const stop = await prisma.stop.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StopFindUniqueOrThrowArgs>(args: SelectSubset<T, StopFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StopClient<$Result.GetResult<Prisma.$StopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stop that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StopFindFirstArgs} args - Arguments to find a Stop
     * @example
     * // Get one Stop
     * const stop = await prisma.stop.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StopFindFirstArgs>(args?: SelectSubset<T, StopFindFirstArgs<ExtArgs>>): Prisma__StopClient<$Result.GetResult<Prisma.$StopPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stop that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StopFindFirstOrThrowArgs} args - Arguments to find a Stop
     * @example
     * // Get one Stop
     * const stop = await prisma.stop.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StopFindFirstOrThrowArgs>(args?: SelectSubset<T, StopFindFirstOrThrowArgs<ExtArgs>>): Prisma__StopClient<$Result.GetResult<Prisma.$StopPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Stops that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StopFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stops
     * const stops = await prisma.stop.findMany()
     * 
     * // Get first 10 Stops
     * const stops = await prisma.stop.findMany({ take: 10 })
     * 
     * // Only select the `StopID`
     * const stopWithStopIDOnly = await prisma.stop.findMany({ select: { StopID: true } })
     * 
     */
    findMany<T extends StopFindManyArgs>(args?: SelectSubset<T, StopFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StopPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Stop.
     * @param {StopCreateArgs} args - Arguments to create a Stop.
     * @example
     * // Create one Stop
     * const Stop = await prisma.stop.create({
     *   data: {
     *     // ... data to create a Stop
     *   }
     * })
     * 
     */
    create<T extends StopCreateArgs>(args: SelectSubset<T, StopCreateArgs<ExtArgs>>): Prisma__StopClient<$Result.GetResult<Prisma.$StopPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Stops.
     * @param {StopCreateManyArgs} args - Arguments to create many Stops.
     * @example
     * // Create many Stops
     * const stop = await prisma.stop.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StopCreateManyArgs>(args?: SelectSubset<T, StopCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Stops and returns the data saved in the database.
     * @param {StopCreateManyAndReturnArgs} args - Arguments to create many Stops.
     * @example
     * // Create many Stops
     * const stop = await prisma.stop.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Stops and only return the `StopID`
     * const stopWithStopIDOnly = await prisma.stop.createManyAndReturn({
     *   select: { StopID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StopCreateManyAndReturnArgs>(args?: SelectSubset<T, StopCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StopPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Stop.
     * @param {StopDeleteArgs} args - Arguments to delete one Stop.
     * @example
     * // Delete one Stop
     * const Stop = await prisma.stop.delete({
     *   where: {
     *     // ... filter to delete one Stop
     *   }
     * })
     * 
     */
    delete<T extends StopDeleteArgs>(args: SelectSubset<T, StopDeleteArgs<ExtArgs>>): Prisma__StopClient<$Result.GetResult<Prisma.$StopPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Stop.
     * @param {StopUpdateArgs} args - Arguments to update one Stop.
     * @example
     * // Update one Stop
     * const stop = await prisma.stop.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StopUpdateArgs>(args: SelectSubset<T, StopUpdateArgs<ExtArgs>>): Prisma__StopClient<$Result.GetResult<Prisma.$StopPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Stops.
     * @param {StopDeleteManyArgs} args - Arguments to filter Stops to delete.
     * @example
     * // Delete a few Stops
     * const { count } = await prisma.stop.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StopDeleteManyArgs>(args?: SelectSubset<T, StopDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StopUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stops
     * const stop = await prisma.stop.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StopUpdateManyArgs>(args: SelectSubset<T, StopUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stops and returns the data updated in the database.
     * @param {StopUpdateManyAndReturnArgs} args - Arguments to update many Stops.
     * @example
     * // Update many Stops
     * const stop = await prisma.stop.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Stops and only return the `StopID`
     * const stopWithStopIDOnly = await prisma.stop.updateManyAndReturn({
     *   select: { StopID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StopUpdateManyAndReturnArgs>(args: SelectSubset<T, StopUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StopPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Stop.
     * @param {StopUpsertArgs} args - Arguments to update or create a Stop.
     * @example
     * // Update or create a Stop
     * const stop = await prisma.stop.upsert({
     *   create: {
     *     // ... data to create a Stop
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Stop we want to update
     *   }
     * })
     */
    upsert<T extends StopUpsertArgs>(args: SelectSubset<T, StopUpsertArgs<ExtArgs>>): Prisma__StopClient<$Result.GetResult<Prisma.$StopPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Stops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StopCountArgs} args - Arguments to filter Stops to count.
     * @example
     * // Count the number of Stops
     * const count = await prisma.stop.count({
     *   where: {
     *     // ... the filter for the Stops we want to count
     *   }
     * })
    **/
    count<T extends StopCountArgs>(
      args?: Subset<T, StopCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StopCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Stop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StopAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StopAggregateArgs>(args: Subset<T, StopAggregateArgs>): Prisma.PrismaPromise<GetStopAggregateType<T>>

    /**
     * Group by Stop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StopGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StopGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StopGroupByArgs['orderBy'] }
        : { orderBy?: StopGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StopGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStopGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Stop model
   */
  readonly fields: StopFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Stop.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StopClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    routesAsStart<T extends Stop$routesAsStartArgs<ExtArgs> = {}>(args?: Subset<T, Stop$routesAsStartArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    routesAsEnd<T extends Stop$routesAsEndArgs<ExtArgs> = {}>(args?: Subset<T, Stop$routesAsEndArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    RouteStops<T extends Stop$RouteStopsArgs<ExtArgs> = {}>(args?: Subset<T, Stop$RouteStopsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RouteStopPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Stop model
   */
  interface StopFieldRefs {
    readonly StopID: FieldRef<"Stop", 'String'>
    readonly StopName: FieldRef<"Stop", 'String'>
    readonly latitude: FieldRef<"Stop", 'String'>
    readonly longitude: FieldRef<"Stop", 'String'>
    readonly IsDeleted: FieldRef<"Stop", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Stop findUnique
   */
  export type StopFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stop
     */
    select?: StopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stop
     */
    omit?: StopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StopInclude<ExtArgs> | null
    /**
     * Filter, which Stop to fetch.
     */
    where: StopWhereUniqueInput
  }

  /**
   * Stop findUniqueOrThrow
   */
  export type StopFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stop
     */
    select?: StopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stop
     */
    omit?: StopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StopInclude<ExtArgs> | null
    /**
     * Filter, which Stop to fetch.
     */
    where: StopWhereUniqueInput
  }

  /**
   * Stop findFirst
   */
  export type StopFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stop
     */
    select?: StopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stop
     */
    omit?: StopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StopInclude<ExtArgs> | null
    /**
     * Filter, which Stop to fetch.
     */
    where?: StopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stops to fetch.
     */
    orderBy?: StopOrderByWithRelationInput | StopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stops.
     */
    cursor?: StopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stops.
     */
    distinct?: StopScalarFieldEnum | StopScalarFieldEnum[]
  }

  /**
   * Stop findFirstOrThrow
   */
  export type StopFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stop
     */
    select?: StopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stop
     */
    omit?: StopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StopInclude<ExtArgs> | null
    /**
     * Filter, which Stop to fetch.
     */
    where?: StopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stops to fetch.
     */
    orderBy?: StopOrderByWithRelationInput | StopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stops.
     */
    cursor?: StopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stops.
     */
    distinct?: StopScalarFieldEnum | StopScalarFieldEnum[]
  }

  /**
   * Stop findMany
   */
  export type StopFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stop
     */
    select?: StopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stop
     */
    omit?: StopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StopInclude<ExtArgs> | null
    /**
     * Filter, which Stops to fetch.
     */
    where?: StopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stops to fetch.
     */
    orderBy?: StopOrderByWithRelationInput | StopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Stops.
     */
    cursor?: StopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stops.
     */
    skip?: number
    distinct?: StopScalarFieldEnum | StopScalarFieldEnum[]
  }

  /**
   * Stop create
   */
  export type StopCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stop
     */
    select?: StopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stop
     */
    omit?: StopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StopInclude<ExtArgs> | null
    /**
     * The data needed to create a Stop.
     */
    data: XOR<StopCreateInput, StopUncheckedCreateInput>
  }

  /**
   * Stop createMany
   */
  export type StopCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Stops.
     */
    data: StopCreateManyInput | StopCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Stop createManyAndReturn
   */
  export type StopCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stop
     */
    select?: StopSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stop
     */
    omit?: StopOmit<ExtArgs> | null
    /**
     * The data used to create many Stops.
     */
    data: StopCreateManyInput | StopCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Stop update
   */
  export type StopUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stop
     */
    select?: StopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stop
     */
    omit?: StopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StopInclude<ExtArgs> | null
    /**
     * The data needed to update a Stop.
     */
    data: XOR<StopUpdateInput, StopUncheckedUpdateInput>
    /**
     * Choose, which Stop to update.
     */
    where: StopWhereUniqueInput
  }

  /**
   * Stop updateMany
   */
  export type StopUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Stops.
     */
    data: XOR<StopUpdateManyMutationInput, StopUncheckedUpdateManyInput>
    /**
     * Filter which Stops to update
     */
    where?: StopWhereInput
    /**
     * Limit how many Stops to update.
     */
    limit?: number
  }

  /**
   * Stop updateManyAndReturn
   */
  export type StopUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stop
     */
    select?: StopSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stop
     */
    omit?: StopOmit<ExtArgs> | null
    /**
     * The data used to update Stops.
     */
    data: XOR<StopUpdateManyMutationInput, StopUncheckedUpdateManyInput>
    /**
     * Filter which Stops to update
     */
    where?: StopWhereInput
    /**
     * Limit how many Stops to update.
     */
    limit?: number
  }

  /**
   * Stop upsert
   */
  export type StopUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stop
     */
    select?: StopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stop
     */
    omit?: StopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StopInclude<ExtArgs> | null
    /**
     * The filter to search for the Stop to update in case it exists.
     */
    where: StopWhereUniqueInput
    /**
     * In case the Stop found by the `where` argument doesn't exist, create a new Stop with this data.
     */
    create: XOR<StopCreateInput, StopUncheckedCreateInput>
    /**
     * In case the Stop was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StopUpdateInput, StopUncheckedUpdateInput>
  }

  /**
   * Stop delete
   */
  export type StopDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stop
     */
    select?: StopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stop
     */
    omit?: StopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StopInclude<ExtArgs> | null
    /**
     * Filter which Stop to delete.
     */
    where: StopWhereUniqueInput
  }

  /**
   * Stop deleteMany
   */
  export type StopDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stops to delete
     */
    where?: StopWhereInput
    /**
     * Limit how many Stops to delete.
     */
    limit?: number
  }

  /**
   * Stop.routesAsStart
   */
  export type Stop$routesAsStartArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    where?: RouteWhereInput
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    cursor?: RouteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RouteScalarFieldEnum | RouteScalarFieldEnum[]
  }

  /**
   * Stop.routesAsEnd
   */
  export type Stop$routesAsEndArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    where?: RouteWhereInput
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    cursor?: RouteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RouteScalarFieldEnum | RouteScalarFieldEnum[]
  }

  /**
   * Stop.RouteStops
   */
  export type Stop$RouteStopsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouteStop
     */
    select?: RouteStopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RouteStop
     */
    omit?: RouteStopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteStopInclude<ExtArgs> | null
    where?: RouteStopWhereInput
    orderBy?: RouteStopOrderByWithRelationInput | RouteStopOrderByWithRelationInput[]
    cursor?: RouteStopWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RouteStopScalarFieldEnum | RouteStopScalarFieldEnum[]
  }

  /**
   * Stop without action
   */
  export type StopDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stop
     */
    select?: StopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stop
     */
    omit?: StopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StopInclude<ExtArgs> | null
  }


  /**
   * Model Route
   */

  export type AggregateRoute = {
    _count: RouteCountAggregateOutputType | null
    _min: RouteMinAggregateOutputType | null
    _max: RouteMaxAggregateOutputType | null
  }

  export type RouteMinAggregateOutputType = {
    RouteID: string | null
    StartStopID: string | null
    EndStopID: string | null
    RouteName: string | null
    IsDeleted: boolean | null
  }

  export type RouteMaxAggregateOutputType = {
    RouteID: string | null
    StartStopID: string | null
    EndStopID: string | null
    RouteName: string | null
    IsDeleted: boolean | null
  }

  export type RouteCountAggregateOutputType = {
    RouteID: number
    StartStopID: number
    EndStopID: number
    RouteName: number
    IsDeleted: number
    _all: number
  }


  export type RouteMinAggregateInputType = {
    RouteID?: true
    StartStopID?: true
    EndStopID?: true
    RouteName?: true
    IsDeleted?: true
  }

  export type RouteMaxAggregateInputType = {
    RouteID?: true
    StartStopID?: true
    EndStopID?: true
    RouteName?: true
    IsDeleted?: true
  }

  export type RouteCountAggregateInputType = {
    RouteID?: true
    StartStopID?: true
    EndStopID?: true
    RouteName?: true
    IsDeleted?: true
    _all?: true
  }

  export type RouteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Route to aggregate.
     */
    where?: RouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Routes to fetch.
     */
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Routes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Routes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Routes
    **/
    _count?: true | RouteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RouteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RouteMaxAggregateInputType
  }

  export type GetRouteAggregateType<T extends RouteAggregateArgs> = {
        [P in keyof T & keyof AggregateRoute]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoute[P]>
      : GetScalarType<T[P], AggregateRoute[P]>
  }




  export type RouteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RouteWhereInput
    orderBy?: RouteOrderByWithAggregationInput | RouteOrderByWithAggregationInput[]
    by: RouteScalarFieldEnum[] | RouteScalarFieldEnum
    having?: RouteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RouteCountAggregateInputType | true
    _min?: RouteMinAggregateInputType
    _max?: RouteMaxAggregateInputType
  }

  export type RouteGroupByOutputType = {
    RouteID: string
    StartStopID: string
    EndStopID: string
    RouteName: string
    IsDeleted: boolean
    _count: RouteCountAggregateOutputType | null
    _min: RouteMinAggregateOutputType | null
    _max: RouteMaxAggregateOutputType | null
  }

  type GetRouteGroupByPayload<T extends RouteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RouteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RouteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RouteGroupByOutputType[P]>
            : GetScalarType<T[P], RouteGroupByOutputType[P]>
        }
      >
    >


  export type RouteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    RouteID?: boolean
    StartStopID?: boolean
    EndStopID?: boolean
    RouteName?: boolean
    IsDeleted?: boolean
    StartStop?: boolean | StopDefaultArgs<ExtArgs>
    EndStop?: boolean | StopDefaultArgs<ExtArgs>
    RouteStops?: boolean | Route$RouteStopsArgs<ExtArgs>
    BusAssignments?: boolean | Route$BusAssignmentsArgs<ExtArgs>
    _count?: boolean | RouteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["route"]>

  export type RouteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    RouteID?: boolean
    StartStopID?: boolean
    EndStopID?: boolean
    RouteName?: boolean
    IsDeleted?: boolean
    StartStop?: boolean | StopDefaultArgs<ExtArgs>
    EndStop?: boolean | StopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["route"]>

  export type RouteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    RouteID?: boolean
    StartStopID?: boolean
    EndStopID?: boolean
    RouteName?: boolean
    IsDeleted?: boolean
    StartStop?: boolean | StopDefaultArgs<ExtArgs>
    EndStop?: boolean | StopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["route"]>

  export type RouteSelectScalar = {
    RouteID?: boolean
    StartStopID?: boolean
    EndStopID?: boolean
    RouteName?: boolean
    IsDeleted?: boolean
  }

  export type RouteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"RouteID" | "StartStopID" | "EndStopID" | "RouteName" | "IsDeleted", ExtArgs["result"]["route"]>
  export type RouteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    StartStop?: boolean | StopDefaultArgs<ExtArgs>
    EndStop?: boolean | StopDefaultArgs<ExtArgs>
    RouteStops?: boolean | Route$RouteStopsArgs<ExtArgs>
    BusAssignments?: boolean | Route$BusAssignmentsArgs<ExtArgs>
    _count?: boolean | RouteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RouteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    StartStop?: boolean | StopDefaultArgs<ExtArgs>
    EndStop?: boolean | StopDefaultArgs<ExtArgs>
  }
  export type RouteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    StartStop?: boolean | StopDefaultArgs<ExtArgs>
    EndStop?: boolean | StopDefaultArgs<ExtArgs>
  }

  export type $RoutePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Route"
    objects: {
      StartStop: Prisma.$StopPayload<ExtArgs>
      EndStop: Prisma.$StopPayload<ExtArgs>
      RouteStops: Prisma.$RouteStopPayload<ExtArgs>[]
      BusAssignments: Prisma.$BusAssignmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      RouteID: string
      StartStopID: string
      EndStopID: string
      RouteName: string
      IsDeleted: boolean
    }, ExtArgs["result"]["route"]>
    composites: {}
  }

  type RouteGetPayload<S extends boolean | null | undefined | RouteDefaultArgs> = $Result.GetResult<Prisma.$RoutePayload, S>

  type RouteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RouteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RouteCountAggregateInputType | true
    }

  export interface RouteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Route'], meta: { name: 'Route' } }
    /**
     * Find zero or one Route that matches the filter.
     * @param {RouteFindUniqueArgs} args - Arguments to find a Route
     * @example
     * // Get one Route
     * const route = await prisma.route.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RouteFindUniqueArgs>(args: SelectSubset<T, RouteFindUniqueArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Route that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RouteFindUniqueOrThrowArgs} args - Arguments to find a Route
     * @example
     * // Get one Route
     * const route = await prisma.route.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RouteFindUniqueOrThrowArgs>(args: SelectSubset<T, RouteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Route that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteFindFirstArgs} args - Arguments to find a Route
     * @example
     * // Get one Route
     * const route = await prisma.route.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RouteFindFirstArgs>(args?: SelectSubset<T, RouteFindFirstArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Route that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteFindFirstOrThrowArgs} args - Arguments to find a Route
     * @example
     * // Get one Route
     * const route = await prisma.route.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RouteFindFirstOrThrowArgs>(args?: SelectSubset<T, RouteFindFirstOrThrowArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Routes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Routes
     * const routes = await prisma.route.findMany()
     * 
     * // Get first 10 Routes
     * const routes = await prisma.route.findMany({ take: 10 })
     * 
     * // Only select the `RouteID`
     * const routeWithRouteIDOnly = await prisma.route.findMany({ select: { RouteID: true } })
     * 
     */
    findMany<T extends RouteFindManyArgs>(args?: SelectSubset<T, RouteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Route.
     * @param {RouteCreateArgs} args - Arguments to create a Route.
     * @example
     * // Create one Route
     * const Route = await prisma.route.create({
     *   data: {
     *     // ... data to create a Route
     *   }
     * })
     * 
     */
    create<T extends RouteCreateArgs>(args: SelectSubset<T, RouteCreateArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Routes.
     * @param {RouteCreateManyArgs} args - Arguments to create many Routes.
     * @example
     * // Create many Routes
     * const route = await prisma.route.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RouteCreateManyArgs>(args?: SelectSubset<T, RouteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Routes and returns the data saved in the database.
     * @param {RouteCreateManyAndReturnArgs} args - Arguments to create many Routes.
     * @example
     * // Create many Routes
     * const route = await prisma.route.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Routes and only return the `RouteID`
     * const routeWithRouteIDOnly = await prisma.route.createManyAndReturn({
     *   select: { RouteID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RouteCreateManyAndReturnArgs>(args?: SelectSubset<T, RouteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Route.
     * @param {RouteDeleteArgs} args - Arguments to delete one Route.
     * @example
     * // Delete one Route
     * const Route = await prisma.route.delete({
     *   where: {
     *     // ... filter to delete one Route
     *   }
     * })
     * 
     */
    delete<T extends RouteDeleteArgs>(args: SelectSubset<T, RouteDeleteArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Route.
     * @param {RouteUpdateArgs} args - Arguments to update one Route.
     * @example
     * // Update one Route
     * const route = await prisma.route.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RouteUpdateArgs>(args: SelectSubset<T, RouteUpdateArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Routes.
     * @param {RouteDeleteManyArgs} args - Arguments to filter Routes to delete.
     * @example
     * // Delete a few Routes
     * const { count } = await prisma.route.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RouteDeleteManyArgs>(args?: SelectSubset<T, RouteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Routes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Routes
     * const route = await prisma.route.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RouteUpdateManyArgs>(args: SelectSubset<T, RouteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Routes and returns the data updated in the database.
     * @param {RouteUpdateManyAndReturnArgs} args - Arguments to update many Routes.
     * @example
     * // Update many Routes
     * const route = await prisma.route.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Routes and only return the `RouteID`
     * const routeWithRouteIDOnly = await prisma.route.updateManyAndReturn({
     *   select: { RouteID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RouteUpdateManyAndReturnArgs>(args: SelectSubset<T, RouteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Route.
     * @param {RouteUpsertArgs} args - Arguments to update or create a Route.
     * @example
     * // Update or create a Route
     * const route = await prisma.route.upsert({
     *   create: {
     *     // ... data to create a Route
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Route we want to update
     *   }
     * })
     */
    upsert<T extends RouteUpsertArgs>(args: SelectSubset<T, RouteUpsertArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Routes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteCountArgs} args - Arguments to filter Routes to count.
     * @example
     * // Count the number of Routes
     * const count = await prisma.route.count({
     *   where: {
     *     // ... the filter for the Routes we want to count
     *   }
     * })
    **/
    count<T extends RouteCountArgs>(
      args?: Subset<T, RouteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RouteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Route.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RouteAggregateArgs>(args: Subset<T, RouteAggregateArgs>): Prisma.PrismaPromise<GetRouteAggregateType<T>>

    /**
     * Group by Route.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RouteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RouteGroupByArgs['orderBy'] }
        : { orderBy?: RouteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RouteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRouteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Route model
   */
  readonly fields: RouteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Route.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RouteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    StartStop<T extends StopDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StopDefaultArgs<ExtArgs>>): Prisma__StopClient<$Result.GetResult<Prisma.$StopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    EndStop<T extends StopDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StopDefaultArgs<ExtArgs>>): Prisma__StopClient<$Result.GetResult<Prisma.$StopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    RouteStops<T extends Route$RouteStopsArgs<ExtArgs> = {}>(args?: Subset<T, Route$RouteStopsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RouteStopPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    BusAssignments<T extends Route$BusAssignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Route$BusAssignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Route model
   */
  interface RouteFieldRefs {
    readonly RouteID: FieldRef<"Route", 'String'>
    readonly StartStopID: FieldRef<"Route", 'String'>
    readonly EndStopID: FieldRef<"Route", 'String'>
    readonly RouteName: FieldRef<"Route", 'String'>
    readonly IsDeleted: FieldRef<"Route", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Route findUnique
   */
  export type RouteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Route to fetch.
     */
    where: RouteWhereUniqueInput
  }

  /**
   * Route findUniqueOrThrow
   */
  export type RouteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Route to fetch.
     */
    where: RouteWhereUniqueInput
  }

  /**
   * Route findFirst
   */
  export type RouteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Route to fetch.
     */
    where?: RouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Routes to fetch.
     */
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Routes.
     */
    cursor?: RouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Routes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Routes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Routes.
     */
    distinct?: RouteScalarFieldEnum | RouteScalarFieldEnum[]
  }

  /**
   * Route findFirstOrThrow
   */
  export type RouteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Route to fetch.
     */
    where?: RouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Routes to fetch.
     */
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Routes.
     */
    cursor?: RouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Routes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Routes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Routes.
     */
    distinct?: RouteScalarFieldEnum | RouteScalarFieldEnum[]
  }

  /**
   * Route findMany
   */
  export type RouteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Routes to fetch.
     */
    where?: RouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Routes to fetch.
     */
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Routes.
     */
    cursor?: RouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Routes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Routes.
     */
    skip?: number
    distinct?: RouteScalarFieldEnum | RouteScalarFieldEnum[]
  }

  /**
   * Route create
   */
  export type RouteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * The data needed to create a Route.
     */
    data: XOR<RouteCreateInput, RouteUncheckedCreateInput>
  }

  /**
   * Route createMany
   */
  export type RouteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Routes.
     */
    data: RouteCreateManyInput | RouteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Route createManyAndReturn
   */
  export type RouteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * The data used to create many Routes.
     */
    data: RouteCreateManyInput | RouteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Route update
   */
  export type RouteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * The data needed to update a Route.
     */
    data: XOR<RouteUpdateInput, RouteUncheckedUpdateInput>
    /**
     * Choose, which Route to update.
     */
    where: RouteWhereUniqueInput
  }

  /**
   * Route updateMany
   */
  export type RouteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Routes.
     */
    data: XOR<RouteUpdateManyMutationInput, RouteUncheckedUpdateManyInput>
    /**
     * Filter which Routes to update
     */
    where?: RouteWhereInput
    /**
     * Limit how many Routes to update.
     */
    limit?: number
  }

  /**
   * Route updateManyAndReturn
   */
  export type RouteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * The data used to update Routes.
     */
    data: XOR<RouteUpdateManyMutationInput, RouteUncheckedUpdateManyInput>
    /**
     * Filter which Routes to update
     */
    where?: RouteWhereInput
    /**
     * Limit how many Routes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Route upsert
   */
  export type RouteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * The filter to search for the Route to update in case it exists.
     */
    where: RouteWhereUniqueInput
    /**
     * In case the Route found by the `where` argument doesn't exist, create a new Route with this data.
     */
    create: XOR<RouteCreateInput, RouteUncheckedCreateInput>
    /**
     * In case the Route was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RouteUpdateInput, RouteUncheckedUpdateInput>
  }

  /**
   * Route delete
   */
  export type RouteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter which Route to delete.
     */
    where: RouteWhereUniqueInput
  }

  /**
   * Route deleteMany
   */
  export type RouteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Routes to delete
     */
    where?: RouteWhereInput
    /**
     * Limit how many Routes to delete.
     */
    limit?: number
  }

  /**
   * Route.RouteStops
   */
  export type Route$RouteStopsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouteStop
     */
    select?: RouteStopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RouteStop
     */
    omit?: RouteStopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteStopInclude<ExtArgs> | null
    where?: RouteStopWhereInput
    orderBy?: RouteStopOrderByWithRelationInput | RouteStopOrderByWithRelationInput[]
    cursor?: RouteStopWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RouteStopScalarFieldEnum | RouteStopScalarFieldEnum[]
  }

  /**
   * Route.BusAssignments
   */
  export type Route$BusAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusAssignment
     */
    select?: BusAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusAssignment
     */
    omit?: BusAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusAssignmentInclude<ExtArgs> | null
    where?: BusAssignmentWhereInput
    orderBy?: BusAssignmentOrderByWithRelationInput | BusAssignmentOrderByWithRelationInput[]
    cursor?: BusAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BusAssignmentScalarFieldEnum | BusAssignmentScalarFieldEnum[]
  }

  /**
   * Route without action
   */
  export type RouteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
  }


  /**
   * Model RouteStop
   */

  export type AggregateRouteStop = {
    _count: RouteStopCountAggregateOutputType | null
    _avg: RouteStopAvgAggregateOutputType | null
    _sum: RouteStopSumAggregateOutputType | null
    _min: RouteStopMinAggregateOutputType | null
    _max: RouteStopMaxAggregateOutputType | null
  }

  export type RouteStopAvgAggregateOutputType = {
    StopOrder: number | null
  }

  export type RouteStopSumAggregateOutputType = {
    StopOrder: number | null
  }

  export type RouteStopMinAggregateOutputType = {
    RouteStopID: string | null
    RouteID: string | null
    StopID: string | null
    StopOrder: number | null
  }

  export type RouteStopMaxAggregateOutputType = {
    RouteStopID: string | null
    RouteID: string | null
    StopID: string | null
    StopOrder: number | null
  }

  export type RouteStopCountAggregateOutputType = {
    RouteStopID: number
    RouteID: number
    StopID: number
    StopOrder: number
    _all: number
  }


  export type RouteStopAvgAggregateInputType = {
    StopOrder?: true
  }

  export type RouteStopSumAggregateInputType = {
    StopOrder?: true
  }

  export type RouteStopMinAggregateInputType = {
    RouteStopID?: true
    RouteID?: true
    StopID?: true
    StopOrder?: true
  }

  export type RouteStopMaxAggregateInputType = {
    RouteStopID?: true
    RouteID?: true
    StopID?: true
    StopOrder?: true
  }

  export type RouteStopCountAggregateInputType = {
    RouteStopID?: true
    RouteID?: true
    StopID?: true
    StopOrder?: true
    _all?: true
  }

  export type RouteStopAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RouteStop to aggregate.
     */
    where?: RouteStopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RouteStops to fetch.
     */
    orderBy?: RouteStopOrderByWithRelationInput | RouteStopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RouteStopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RouteStops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RouteStops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RouteStops
    **/
    _count?: true | RouteStopCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RouteStopAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RouteStopSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RouteStopMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RouteStopMaxAggregateInputType
  }

  export type GetRouteStopAggregateType<T extends RouteStopAggregateArgs> = {
        [P in keyof T & keyof AggregateRouteStop]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRouteStop[P]>
      : GetScalarType<T[P], AggregateRouteStop[P]>
  }




  export type RouteStopGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RouteStopWhereInput
    orderBy?: RouteStopOrderByWithAggregationInput | RouteStopOrderByWithAggregationInput[]
    by: RouteStopScalarFieldEnum[] | RouteStopScalarFieldEnum
    having?: RouteStopScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RouteStopCountAggregateInputType | true
    _avg?: RouteStopAvgAggregateInputType
    _sum?: RouteStopSumAggregateInputType
    _min?: RouteStopMinAggregateInputType
    _max?: RouteStopMaxAggregateInputType
  }

  export type RouteStopGroupByOutputType = {
    RouteStopID: string
    RouteID: string
    StopID: string
    StopOrder: number
    _count: RouteStopCountAggregateOutputType | null
    _avg: RouteStopAvgAggregateOutputType | null
    _sum: RouteStopSumAggregateOutputType | null
    _min: RouteStopMinAggregateOutputType | null
    _max: RouteStopMaxAggregateOutputType | null
  }

  type GetRouteStopGroupByPayload<T extends RouteStopGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RouteStopGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RouteStopGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RouteStopGroupByOutputType[P]>
            : GetScalarType<T[P], RouteStopGroupByOutputType[P]>
        }
      >
    >


  export type RouteStopSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    RouteStopID?: boolean
    RouteID?: boolean
    StopID?: boolean
    StopOrder?: boolean
    Route?: boolean | RouteDefaultArgs<ExtArgs>
    Stop?: boolean | StopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["routeStop"]>

  export type RouteStopSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    RouteStopID?: boolean
    RouteID?: boolean
    StopID?: boolean
    StopOrder?: boolean
    Route?: boolean | RouteDefaultArgs<ExtArgs>
    Stop?: boolean | StopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["routeStop"]>

  export type RouteStopSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    RouteStopID?: boolean
    RouteID?: boolean
    StopID?: boolean
    StopOrder?: boolean
    Route?: boolean | RouteDefaultArgs<ExtArgs>
    Stop?: boolean | StopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["routeStop"]>

  export type RouteStopSelectScalar = {
    RouteStopID?: boolean
    RouteID?: boolean
    StopID?: boolean
    StopOrder?: boolean
  }

  export type RouteStopOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"RouteStopID" | "RouteID" | "StopID" | "StopOrder", ExtArgs["result"]["routeStop"]>
  export type RouteStopInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Route?: boolean | RouteDefaultArgs<ExtArgs>
    Stop?: boolean | StopDefaultArgs<ExtArgs>
  }
  export type RouteStopIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Route?: boolean | RouteDefaultArgs<ExtArgs>
    Stop?: boolean | StopDefaultArgs<ExtArgs>
  }
  export type RouteStopIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Route?: boolean | RouteDefaultArgs<ExtArgs>
    Stop?: boolean | StopDefaultArgs<ExtArgs>
  }

  export type $RouteStopPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RouteStop"
    objects: {
      Route: Prisma.$RoutePayload<ExtArgs>
      Stop: Prisma.$StopPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      RouteStopID: string
      RouteID: string
      StopID: string
      StopOrder: number
    }, ExtArgs["result"]["routeStop"]>
    composites: {}
  }

  type RouteStopGetPayload<S extends boolean | null | undefined | RouteStopDefaultArgs> = $Result.GetResult<Prisma.$RouteStopPayload, S>

  type RouteStopCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RouteStopFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RouteStopCountAggregateInputType | true
    }

  export interface RouteStopDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RouteStop'], meta: { name: 'RouteStop' } }
    /**
     * Find zero or one RouteStop that matches the filter.
     * @param {RouteStopFindUniqueArgs} args - Arguments to find a RouteStop
     * @example
     * // Get one RouteStop
     * const routeStop = await prisma.routeStop.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RouteStopFindUniqueArgs>(args: SelectSubset<T, RouteStopFindUniqueArgs<ExtArgs>>): Prisma__RouteStopClient<$Result.GetResult<Prisma.$RouteStopPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RouteStop that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RouteStopFindUniqueOrThrowArgs} args - Arguments to find a RouteStop
     * @example
     * // Get one RouteStop
     * const routeStop = await prisma.routeStop.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RouteStopFindUniqueOrThrowArgs>(args: SelectSubset<T, RouteStopFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RouteStopClient<$Result.GetResult<Prisma.$RouteStopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RouteStop that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteStopFindFirstArgs} args - Arguments to find a RouteStop
     * @example
     * // Get one RouteStop
     * const routeStop = await prisma.routeStop.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RouteStopFindFirstArgs>(args?: SelectSubset<T, RouteStopFindFirstArgs<ExtArgs>>): Prisma__RouteStopClient<$Result.GetResult<Prisma.$RouteStopPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RouteStop that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteStopFindFirstOrThrowArgs} args - Arguments to find a RouteStop
     * @example
     * // Get one RouteStop
     * const routeStop = await prisma.routeStop.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RouteStopFindFirstOrThrowArgs>(args?: SelectSubset<T, RouteStopFindFirstOrThrowArgs<ExtArgs>>): Prisma__RouteStopClient<$Result.GetResult<Prisma.$RouteStopPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RouteStops that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteStopFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RouteStops
     * const routeStops = await prisma.routeStop.findMany()
     * 
     * // Get first 10 RouteStops
     * const routeStops = await prisma.routeStop.findMany({ take: 10 })
     * 
     * // Only select the `RouteStopID`
     * const routeStopWithRouteStopIDOnly = await prisma.routeStop.findMany({ select: { RouteStopID: true } })
     * 
     */
    findMany<T extends RouteStopFindManyArgs>(args?: SelectSubset<T, RouteStopFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RouteStopPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RouteStop.
     * @param {RouteStopCreateArgs} args - Arguments to create a RouteStop.
     * @example
     * // Create one RouteStop
     * const RouteStop = await prisma.routeStop.create({
     *   data: {
     *     // ... data to create a RouteStop
     *   }
     * })
     * 
     */
    create<T extends RouteStopCreateArgs>(args: SelectSubset<T, RouteStopCreateArgs<ExtArgs>>): Prisma__RouteStopClient<$Result.GetResult<Prisma.$RouteStopPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RouteStops.
     * @param {RouteStopCreateManyArgs} args - Arguments to create many RouteStops.
     * @example
     * // Create many RouteStops
     * const routeStop = await prisma.routeStop.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RouteStopCreateManyArgs>(args?: SelectSubset<T, RouteStopCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RouteStops and returns the data saved in the database.
     * @param {RouteStopCreateManyAndReturnArgs} args - Arguments to create many RouteStops.
     * @example
     * // Create many RouteStops
     * const routeStop = await prisma.routeStop.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RouteStops and only return the `RouteStopID`
     * const routeStopWithRouteStopIDOnly = await prisma.routeStop.createManyAndReturn({
     *   select: { RouteStopID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RouteStopCreateManyAndReturnArgs>(args?: SelectSubset<T, RouteStopCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RouteStopPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RouteStop.
     * @param {RouteStopDeleteArgs} args - Arguments to delete one RouteStop.
     * @example
     * // Delete one RouteStop
     * const RouteStop = await prisma.routeStop.delete({
     *   where: {
     *     // ... filter to delete one RouteStop
     *   }
     * })
     * 
     */
    delete<T extends RouteStopDeleteArgs>(args: SelectSubset<T, RouteStopDeleteArgs<ExtArgs>>): Prisma__RouteStopClient<$Result.GetResult<Prisma.$RouteStopPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RouteStop.
     * @param {RouteStopUpdateArgs} args - Arguments to update one RouteStop.
     * @example
     * // Update one RouteStop
     * const routeStop = await prisma.routeStop.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RouteStopUpdateArgs>(args: SelectSubset<T, RouteStopUpdateArgs<ExtArgs>>): Prisma__RouteStopClient<$Result.GetResult<Prisma.$RouteStopPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RouteStops.
     * @param {RouteStopDeleteManyArgs} args - Arguments to filter RouteStops to delete.
     * @example
     * // Delete a few RouteStops
     * const { count } = await prisma.routeStop.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RouteStopDeleteManyArgs>(args?: SelectSubset<T, RouteStopDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RouteStops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteStopUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RouteStops
     * const routeStop = await prisma.routeStop.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RouteStopUpdateManyArgs>(args: SelectSubset<T, RouteStopUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RouteStops and returns the data updated in the database.
     * @param {RouteStopUpdateManyAndReturnArgs} args - Arguments to update many RouteStops.
     * @example
     * // Update many RouteStops
     * const routeStop = await prisma.routeStop.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RouteStops and only return the `RouteStopID`
     * const routeStopWithRouteStopIDOnly = await prisma.routeStop.updateManyAndReturn({
     *   select: { RouteStopID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RouteStopUpdateManyAndReturnArgs>(args: SelectSubset<T, RouteStopUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RouteStopPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RouteStop.
     * @param {RouteStopUpsertArgs} args - Arguments to update or create a RouteStop.
     * @example
     * // Update or create a RouteStop
     * const routeStop = await prisma.routeStop.upsert({
     *   create: {
     *     // ... data to create a RouteStop
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RouteStop we want to update
     *   }
     * })
     */
    upsert<T extends RouteStopUpsertArgs>(args: SelectSubset<T, RouteStopUpsertArgs<ExtArgs>>): Prisma__RouteStopClient<$Result.GetResult<Prisma.$RouteStopPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RouteStops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteStopCountArgs} args - Arguments to filter RouteStops to count.
     * @example
     * // Count the number of RouteStops
     * const count = await prisma.routeStop.count({
     *   where: {
     *     // ... the filter for the RouteStops we want to count
     *   }
     * })
    **/
    count<T extends RouteStopCountArgs>(
      args?: Subset<T, RouteStopCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RouteStopCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RouteStop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteStopAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RouteStopAggregateArgs>(args: Subset<T, RouteStopAggregateArgs>): Prisma.PrismaPromise<GetRouteStopAggregateType<T>>

    /**
     * Group by RouteStop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteStopGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RouteStopGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RouteStopGroupByArgs['orderBy'] }
        : { orderBy?: RouteStopGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RouteStopGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRouteStopGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RouteStop model
   */
  readonly fields: RouteStopFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RouteStop.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RouteStopClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Route<T extends RouteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RouteDefaultArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    Stop<T extends StopDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StopDefaultArgs<ExtArgs>>): Prisma__StopClient<$Result.GetResult<Prisma.$StopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RouteStop model
   */
  interface RouteStopFieldRefs {
    readonly RouteStopID: FieldRef<"RouteStop", 'String'>
    readonly RouteID: FieldRef<"RouteStop", 'String'>
    readonly StopID: FieldRef<"RouteStop", 'String'>
    readonly StopOrder: FieldRef<"RouteStop", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * RouteStop findUnique
   */
  export type RouteStopFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouteStop
     */
    select?: RouteStopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RouteStop
     */
    omit?: RouteStopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteStopInclude<ExtArgs> | null
    /**
     * Filter, which RouteStop to fetch.
     */
    where: RouteStopWhereUniqueInput
  }

  /**
   * RouteStop findUniqueOrThrow
   */
  export type RouteStopFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouteStop
     */
    select?: RouteStopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RouteStop
     */
    omit?: RouteStopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteStopInclude<ExtArgs> | null
    /**
     * Filter, which RouteStop to fetch.
     */
    where: RouteStopWhereUniqueInput
  }

  /**
   * RouteStop findFirst
   */
  export type RouteStopFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouteStop
     */
    select?: RouteStopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RouteStop
     */
    omit?: RouteStopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteStopInclude<ExtArgs> | null
    /**
     * Filter, which RouteStop to fetch.
     */
    where?: RouteStopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RouteStops to fetch.
     */
    orderBy?: RouteStopOrderByWithRelationInput | RouteStopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RouteStops.
     */
    cursor?: RouteStopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RouteStops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RouteStops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RouteStops.
     */
    distinct?: RouteStopScalarFieldEnum | RouteStopScalarFieldEnum[]
  }

  /**
   * RouteStop findFirstOrThrow
   */
  export type RouteStopFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouteStop
     */
    select?: RouteStopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RouteStop
     */
    omit?: RouteStopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteStopInclude<ExtArgs> | null
    /**
     * Filter, which RouteStop to fetch.
     */
    where?: RouteStopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RouteStops to fetch.
     */
    orderBy?: RouteStopOrderByWithRelationInput | RouteStopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RouteStops.
     */
    cursor?: RouteStopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RouteStops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RouteStops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RouteStops.
     */
    distinct?: RouteStopScalarFieldEnum | RouteStopScalarFieldEnum[]
  }

  /**
   * RouteStop findMany
   */
  export type RouteStopFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouteStop
     */
    select?: RouteStopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RouteStop
     */
    omit?: RouteStopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteStopInclude<ExtArgs> | null
    /**
     * Filter, which RouteStops to fetch.
     */
    where?: RouteStopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RouteStops to fetch.
     */
    orderBy?: RouteStopOrderByWithRelationInput | RouteStopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RouteStops.
     */
    cursor?: RouteStopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RouteStops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RouteStops.
     */
    skip?: number
    distinct?: RouteStopScalarFieldEnum | RouteStopScalarFieldEnum[]
  }

  /**
   * RouteStop create
   */
  export type RouteStopCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouteStop
     */
    select?: RouteStopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RouteStop
     */
    omit?: RouteStopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteStopInclude<ExtArgs> | null
    /**
     * The data needed to create a RouteStop.
     */
    data: XOR<RouteStopCreateInput, RouteStopUncheckedCreateInput>
  }

  /**
   * RouteStop createMany
   */
  export type RouteStopCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RouteStops.
     */
    data: RouteStopCreateManyInput | RouteStopCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RouteStop createManyAndReturn
   */
  export type RouteStopCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouteStop
     */
    select?: RouteStopSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RouteStop
     */
    omit?: RouteStopOmit<ExtArgs> | null
    /**
     * The data used to create many RouteStops.
     */
    data: RouteStopCreateManyInput | RouteStopCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteStopIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RouteStop update
   */
  export type RouteStopUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouteStop
     */
    select?: RouteStopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RouteStop
     */
    omit?: RouteStopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteStopInclude<ExtArgs> | null
    /**
     * The data needed to update a RouteStop.
     */
    data: XOR<RouteStopUpdateInput, RouteStopUncheckedUpdateInput>
    /**
     * Choose, which RouteStop to update.
     */
    where: RouteStopWhereUniqueInput
  }

  /**
   * RouteStop updateMany
   */
  export type RouteStopUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RouteStops.
     */
    data: XOR<RouteStopUpdateManyMutationInput, RouteStopUncheckedUpdateManyInput>
    /**
     * Filter which RouteStops to update
     */
    where?: RouteStopWhereInput
    /**
     * Limit how many RouteStops to update.
     */
    limit?: number
  }

  /**
   * RouteStop updateManyAndReturn
   */
  export type RouteStopUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouteStop
     */
    select?: RouteStopSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RouteStop
     */
    omit?: RouteStopOmit<ExtArgs> | null
    /**
     * The data used to update RouteStops.
     */
    data: XOR<RouteStopUpdateManyMutationInput, RouteStopUncheckedUpdateManyInput>
    /**
     * Filter which RouteStops to update
     */
    where?: RouteStopWhereInput
    /**
     * Limit how many RouteStops to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteStopIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RouteStop upsert
   */
  export type RouteStopUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouteStop
     */
    select?: RouteStopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RouteStop
     */
    omit?: RouteStopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteStopInclude<ExtArgs> | null
    /**
     * The filter to search for the RouteStop to update in case it exists.
     */
    where: RouteStopWhereUniqueInput
    /**
     * In case the RouteStop found by the `where` argument doesn't exist, create a new RouteStop with this data.
     */
    create: XOR<RouteStopCreateInput, RouteStopUncheckedCreateInput>
    /**
     * In case the RouteStop was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RouteStopUpdateInput, RouteStopUncheckedUpdateInput>
  }

  /**
   * RouteStop delete
   */
  export type RouteStopDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouteStop
     */
    select?: RouteStopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RouteStop
     */
    omit?: RouteStopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteStopInclude<ExtArgs> | null
    /**
     * Filter which RouteStop to delete.
     */
    where: RouteStopWhereUniqueInput
  }

  /**
   * RouteStop deleteMany
   */
  export type RouteStopDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RouteStops to delete
     */
    where?: RouteStopWhereInput
    /**
     * Limit how many RouteStops to delete.
     */
    limit?: number
  }

  /**
   * RouteStop without action
   */
  export type RouteStopDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouteStop
     */
    select?: RouteStopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RouteStop
     */
    omit?: RouteStopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteStopInclude<ExtArgs> | null
  }


  /**
   * Model BusAssignment
   */

  export type AggregateBusAssignment = {
    _count: BusAssignmentCountAggregateOutputType | null
    _min: BusAssignmentMinAggregateOutputType | null
    _max: BusAssignmentMaxAggregateOutputType | null
  }

  export type BusAssignmentMinAggregateOutputType = {
    BusAssignmentID: string | null
    BusID: string | null
    RouteID: string | null
    AssignmentDate: Date | null
    Battery: boolean | null
    Lights: boolean | null
    Oil: boolean | null
    Water: boolean | null
    Break: boolean | null
    Air: boolean | null
    Gas: boolean | null
    Engine: boolean | null
    TireCondition: boolean | null
    Self_Driver: boolean | null
    Self_Conductor: boolean | null
    IsDeleted: boolean | null
    Status: $Enums.BusOperationStatus | null
  }

  export type BusAssignmentMaxAggregateOutputType = {
    BusAssignmentID: string | null
    BusID: string | null
    RouteID: string | null
    AssignmentDate: Date | null
    Battery: boolean | null
    Lights: boolean | null
    Oil: boolean | null
    Water: boolean | null
    Break: boolean | null
    Air: boolean | null
    Gas: boolean | null
    Engine: boolean | null
    TireCondition: boolean | null
    Self_Driver: boolean | null
    Self_Conductor: boolean | null
    IsDeleted: boolean | null
    Status: $Enums.BusOperationStatus | null
  }

  export type BusAssignmentCountAggregateOutputType = {
    BusAssignmentID: number
    BusID: number
    RouteID: number
    AssignmentDate: number
    Battery: number
    Lights: number
    Oil: number
    Water: number
    Break: number
    Air: number
    Gas: number
    Engine: number
    TireCondition: number
    Self_Driver: number
    Self_Conductor: number
    IsDeleted: number
    Status: number
    _all: number
  }


  export type BusAssignmentMinAggregateInputType = {
    BusAssignmentID?: true
    BusID?: true
    RouteID?: true
    AssignmentDate?: true
    Battery?: true
    Lights?: true
    Oil?: true
    Water?: true
    Break?: true
    Air?: true
    Gas?: true
    Engine?: true
    TireCondition?: true
    Self_Driver?: true
    Self_Conductor?: true
    IsDeleted?: true
    Status?: true
  }

  export type BusAssignmentMaxAggregateInputType = {
    BusAssignmentID?: true
    BusID?: true
    RouteID?: true
    AssignmentDate?: true
    Battery?: true
    Lights?: true
    Oil?: true
    Water?: true
    Break?: true
    Air?: true
    Gas?: true
    Engine?: true
    TireCondition?: true
    Self_Driver?: true
    Self_Conductor?: true
    IsDeleted?: true
    Status?: true
  }

  export type BusAssignmentCountAggregateInputType = {
    BusAssignmentID?: true
    BusID?: true
    RouteID?: true
    AssignmentDate?: true
    Battery?: true
    Lights?: true
    Oil?: true
    Water?: true
    Break?: true
    Air?: true
    Gas?: true
    Engine?: true
    TireCondition?: true
    Self_Driver?: true
    Self_Conductor?: true
    IsDeleted?: true
    Status?: true
    _all?: true
  }

  export type BusAssignmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BusAssignment to aggregate.
     */
    where?: BusAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusAssignments to fetch.
     */
    orderBy?: BusAssignmentOrderByWithRelationInput | BusAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BusAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BusAssignments
    **/
    _count?: true | BusAssignmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BusAssignmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BusAssignmentMaxAggregateInputType
  }

  export type GetBusAssignmentAggregateType<T extends BusAssignmentAggregateArgs> = {
        [P in keyof T & keyof AggregateBusAssignment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBusAssignment[P]>
      : GetScalarType<T[P], AggregateBusAssignment[P]>
  }




  export type BusAssignmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusAssignmentWhereInput
    orderBy?: BusAssignmentOrderByWithAggregationInput | BusAssignmentOrderByWithAggregationInput[]
    by: BusAssignmentScalarFieldEnum[] | BusAssignmentScalarFieldEnum
    having?: BusAssignmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BusAssignmentCountAggregateInputType | true
    _min?: BusAssignmentMinAggregateInputType
    _max?: BusAssignmentMaxAggregateInputType
  }

  export type BusAssignmentGroupByOutputType = {
    BusAssignmentID: string
    BusID: string
    RouteID: string
    AssignmentDate: Date
    Battery: boolean
    Lights: boolean
    Oil: boolean
    Water: boolean
    Break: boolean
    Air: boolean
    Gas: boolean
    Engine: boolean
    TireCondition: boolean
    Self_Driver: boolean
    Self_Conductor: boolean
    IsDeleted: boolean
    Status: $Enums.BusOperationStatus
    _count: BusAssignmentCountAggregateOutputType | null
    _min: BusAssignmentMinAggregateOutputType | null
    _max: BusAssignmentMaxAggregateOutputType | null
  }

  type GetBusAssignmentGroupByPayload<T extends BusAssignmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BusAssignmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BusAssignmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BusAssignmentGroupByOutputType[P]>
            : GetScalarType<T[P], BusAssignmentGroupByOutputType[P]>
        }
      >
    >


  export type BusAssignmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    BusAssignmentID?: boolean
    BusID?: boolean
    RouteID?: boolean
    AssignmentDate?: boolean
    Battery?: boolean
    Lights?: boolean
    Oil?: boolean
    Water?: boolean
    Break?: boolean
    Air?: boolean
    Gas?: boolean
    Engine?: boolean
    TireCondition?: boolean
    Self_Driver?: boolean
    Self_Conductor?: boolean
    IsDeleted?: boolean
    Status?: boolean
    Route?: boolean | RouteDefaultArgs<ExtArgs>
    RegularBusAssignment?: boolean | BusAssignment$RegularBusAssignmentArgs<ExtArgs>
  }, ExtArgs["result"]["busAssignment"]>

  export type BusAssignmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    BusAssignmentID?: boolean
    BusID?: boolean
    RouteID?: boolean
    AssignmentDate?: boolean
    Battery?: boolean
    Lights?: boolean
    Oil?: boolean
    Water?: boolean
    Break?: boolean
    Air?: boolean
    Gas?: boolean
    Engine?: boolean
    TireCondition?: boolean
    Self_Driver?: boolean
    Self_Conductor?: boolean
    IsDeleted?: boolean
    Status?: boolean
    Route?: boolean | RouteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["busAssignment"]>

  export type BusAssignmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    BusAssignmentID?: boolean
    BusID?: boolean
    RouteID?: boolean
    AssignmentDate?: boolean
    Battery?: boolean
    Lights?: boolean
    Oil?: boolean
    Water?: boolean
    Break?: boolean
    Air?: boolean
    Gas?: boolean
    Engine?: boolean
    TireCondition?: boolean
    Self_Driver?: boolean
    Self_Conductor?: boolean
    IsDeleted?: boolean
    Status?: boolean
    Route?: boolean | RouteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["busAssignment"]>

  export type BusAssignmentSelectScalar = {
    BusAssignmentID?: boolean
    BusID?: boolean
    RouteID?: boolean
    AssignmentDate?: boolean
    Battery?: boolean
    Lights?: boolean
    Oil?: boolean
    Water?: boolean
    Break?: boolean
    Air?: boolean
    Gas?: boolean
    Engine?: boolean
    TireCondition?: boolean
    Self_Driver?: boolean
    Self_Conductor?: boolean
    IsDeleted?: boolean
    Status?: boolean
  }

  export type BusAssignmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"BusAssignmentID" | "BusID" | "RouteID" | "AssignmentDate" | "Battery" | "Lights" | "Oil" | "Water" | "Break" | "Air" | "Gas" | "Engine" | "TireCondition" | "Self_Driver" | "Self_Conductor" | "IsDeleted" | "Status", ExtArgs["result"]["busAssignment"]>
  export type BusAssignmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Route?: boolean | RouteDefaultArgs<ExtArgs>
    RegularBusAssignment?: boolean | BusAssignment$RegularBusAssignmentArgs<ExtArgs>
  }
  export type BusAssignmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Route?: boolean | RouteDefaultArgs<ExtArgs>
  }
  export type BusAssignmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Route?: boolean | RouteDefaultArgs<ExtArgs>
  }

  export type $BusAssignmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BusAssignment"
    objects: {
      Route: Prisma.$RoutePayload<ExtArgs>
      RegularBusAssignment: Prisma.$RegularBusAssignmentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      BusAssignmentID: string
      BusID: string
      RouteID: string
      AssignmentDate: Date
      Battery: boolean
      Lights: boolean
      Oil: boolean
      Water: boolean
      Break: boolean
      Air: boolean
      Gas: boolean
      Engine: boolean
      TireCondition: boolean
      Self_Driver: boolean
      Self_Conductor: boolean
      IsDeleted: boolean
      Status: $Enums.BusOperationStatus
    }, ExtArgs["result"]["busAssignment"]>
    composites: {}
  }

  type BusAssignmentGetPayload<S extends boolean | null | undefined | BusAssignmentDefaultArgs> = $Result.GetResult<Prisma.$BusAssignmentPayload, S>

  type BusAssignmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BusAssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BusAssignmentCountAggregateInputType | true
    }

  export interface BusAssignmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BusAssignment'], meta: { name: 'BusAssignment' } }
    /**
     * Find zero or one BusAssignment that matches the filter.
     * @param {BusAssignmentFindUniqueArgs} args - Arguments to find a BusAssignment
     * @example
     * // Get one BusAssignment
     * const busAssignment = await prisma.busAssignment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BusAssignmentFindUniqueArgs>(args: SelectSubset<T, BusAssignmentFindUniqueArgs<ExtArgs>>): Prisma__BusAssignmentClient<$Result.GetResult<Prisma.$BusAssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BusAssignment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BusAssignmentFindUniqueOrThrowArgs} args - Arguments to find a BusAssignment
     * @example
     * // Get one BusAssignment
     * const busAssignment = await prisma.busAssignment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BusAssignmentFindUniqueOrThrowArgs>(args: SelectSubset<T, BusAssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BusAssignmentClient<$Result.GetResult<Prisma.$BusAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BusAssignment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusAssignmentFindFirstArgs} args - Arguments to find a BusAssignment
     * @example
     * // Get one BusAssignment
     * const busAssignment = await prisma.busAssignment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BusAssignmentFindFirstArgs>(args?: SelectSubset<T, BusAssignmentFindFirstArgs<ExtArgs>>): Prisma__BusAssignmentClient<$Result.GetResult<Prisma.$BusAssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BusAssignment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusAssignmentFindFirstOrThrowArgs} args - Arguments to find a BusAssignment
     * @example
     * // Get one BusAssignment
     * const busAssignment = await prisma.busAssignment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BusAssignmentFindFirstOrThrowArgs>(args?: SelectSubset<T, BusAssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__BusAssignmentClient<$Result.GetResult<Prisma.$BusAssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BusAssignments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusAssignmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BusAssignments
     * const busAssignments = await prisma.busAssignment.findMany()
     * 
     * // Get first 10 BusAssignments
     * const busAssignments = await prisma.busAssignment.findMany({ take: 10 })
     * 
     * // Only select the `BusAssignmentID`
     * const busAssignmentWithBusAssignmentIDOnly = await prisma.busAssignment.findMany({ select: { BusAssignmentID: true } })
     * 
     */
    findMany<T extends BusAssignmentFindManyArgs>(args?: SelectSubset<T, BusAssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BusAssignment.
     * @param {BusAssignmentCreateArgs} args - Arguments to create a BusAssignment.
     * @example
     * // Create one BusAssignment
     * const BusAssignment = await prisma.busAssignment.create({
     *   data: {
     *     // ... data to create a BusAssignment
     *   }
     * })
     * 
     */
    create<T extends BusAssignmentCreateArgs>(args: SelectSubset<T, BusAssignmentCreateArgs<ExtArgs>>): Prisma__BusAssignmentClient<$Result.GetResult<Prisma.$BusAssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BusAssignments.
     * @param {BusAssignmentCreateManyArgs} args - Arguments to create many BusAssignments.
     * @example
     * // Create many BusAssignments
     * const busAssignment = await prisma.busAssignment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BusAssignmentCreateManyArgs>(args?: SelectSubset<T, BusAssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BusAssignments and returns the data saved in the database.
     * @param {BusAssignmentCreateManyAndReturnArgs} args - Arguments to create many BusAssignments.
     * @example
     * // Create many BusAssignments
     * const busAssignment = await prisma.busAssignment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BusAssignments and only return the `BusAssignmentID`
     * const busAssignmentWithBusAssignmentIDOnly = await prisma.busAssignment.createManyAndReturn({
     *   select: { BusAssignmentID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BusAssignmentCreateManyAndReturnArgs>(args?: SelectSubset<T, BusAssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusAssignmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BusAssignment.
     * @param {BusAssignmentDeleteArgs} args - Arguments to delete one BusAssignment.
     * @example
     * // Delete one BusAssignment
     * const BusAssignment = await prisma.busAssignment.delete({
     *   where: {
     *     // ... filter to delete one BusAssignment
     *   }
     * })
     * 
     */
    delete<T extends BusAssignmentDeleteArgs>(args: SelectSubset<T, BusAssignmentDeleteArgs<ExtArgs>>): Prisma__BusAssignmentClient<$Result.GetResult<Prisma.$BusAssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BusAssignment.
     * @param {BusAssignmentUpdateArgs} args - Arguments to update one BusAssignment.
     * @example
     * // Update one BusAssignment
     * const busAssignment = await prisma.busAssignment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BusAssignmentUpdateArgs>(args: SelectSubset<T, BusAssignmentUpdateArgs<ExtArgs>>): Prisma__BusAssignmentClient<$Result.GetResult<Prisma.$BusAssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BusAssignments.
     * @param {BusAssignmentDeleteManyArgs} args - Arguments to filter BusAssignments to delete.
     * @example
     * // Delete a few BusAssignments
     * const { count } = await prisma.busAssignment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BusAssignmentDeleteManyArgs>(args?: SelectSubset<T, BusAssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BusAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusAssignmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BusAssignments
     * const busAssignment = await prisma.busAssignment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BusAssignmentUpdateManyArgs>(args: SelectSubset<T, BusAssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BusAssignments and returns the data updated in the database.
     * @param {BusAssignmentUpdateManyAndReturnArgs} args - Arguments to update many BusAssignments.
     * @example
     * // Update many BusAssignments
     * const busAssignment = await prisma.busAssignment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BusAssignments and only return the `BusAssignmentID`
     * const busAssignmentWithBusAssignmentIDOnly = await prisma.busAssignment.updateManyAndReturn({
     *   select: { BusAssignmentID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BusAssignmentUpdateManyAndReturnArgs>(args: SelectSubset<T, BusAssignmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusAssignmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BusAssignment.
     * @param {BusAssignmentUpsertArgs} args - Arguments to update or create a BusAssignment.
     * @example
     * // Update or create a BusAssignment
     * const busAssignment = await prisma.busAssignment.upsert({
     *   create: {
     *     // ... data to create a BusAssignment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BusAssignment we want to update
     *   }
     * })
     */
    upsert<T extends BusAssignmentUpsertArgs>(args: SelectSubset<T, BusAssignmentUpsertArgs<ExtArgs>>): Prisma__BusAssignmentClient<$Result.GetResult<Prisma.$BusAssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BusAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusAssignmentCountArgs} args - Arguments to filter BusAssignments to count.
     * @example
     * // Count the number of BusAssignments
     * const count = await prisma.busAssignment.count({
     *   where: {
     *     // ... the filter for the BusAssignments we want to count
     *   }
     * })
    **/
    count<T extends BusAssignmentCountArgs>(
      args?: Subset<T, BusAssignmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BusAssignmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BusAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusAssignmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BusAssignmentAggregateArgs>(args: Subset<T, BusAssignmentAggregateArgs>): Prisma.PrismaPromise<GetBusAssignmentAggregateType<T>>

    /**
     * Group by BusAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusAssignmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BusAssignmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BusAssignmentGroupByArgs['orderBy'] }
        : { orderBy?: BusAssignmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BusAssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBusAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BusAssignment model
   */
  readonly fields: BusAssignmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BusAssignment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BusAssignmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Route<T extends RouteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RouteDefaultArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    RegularBusAssignment<T extends BusAssignment$RegularBusAssignmentArgs<ExtArgs> = {}>(args?: Subset<T, BusAssignment$RegularBusAssignmentArgs<ExtArgs>>): Prisma__RegularBusAssignmentClient<$Result.GetResult<Prisma.$RegularBusAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BusAssignment model
   */
  interface BusAssignmentFieldRefs {
    readonly BusAssignmentID: FieldRef<"BusAssignment", 'String'>
    readonly BusID: FieldRef<"BusAssignment", 'String'>
    readonly RouteID: FieldRef<"BusAssignment", 'String'>
    readonly AssignmentDate: FieldRef<"BusAssignment", 'DateTime'>
    readonly Battery: FieldRef<"BusAssignment", 'Boolean'>
    readonly Lights: FieldRef<"BusAssignment", 'Boolean'>
    readonly Oil: FieldRef<"BusAssignment", 'Boolean'>
    readonly Water: FieldRef<"BusAssignment", 'Boolean'>
    readonly Break: FieldRef<"BusAssignment", 'Boolean'>
    readonly Air: FieldRef<"BusAssignment", 'Boolean'>
    readonly Gas: FieldRef<"BusAssignment", 'Boolean'>
    readonly Engine: FieldRef<"BusAssignment", 'Boolean'>
    readonly TireCondition: FieldRef<"BusAssignment", 'Boolean'>
    readonly Self_Driver: FieldRef<"BusAssignment", 'Boolean'>
    readonly Self_Conductor: FieldRef<"BusAssignment", 'Boolean'>
    readonly IsDeleted: FieldRef<"BusAssignment", 'Boolean'>
    readonly Status: FieldRef<"BusAssignment", 'BusOperationStatus'>
  }
    

  // Custom InputTypes
  /**
   * BusAssignment findUnique
   */
  export type BusAssignmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusAssignment
     */
    select?: BusAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusAssignment
     */
    omit?: BusAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which BusAssignment to fetch.
     */
    where: BusAssignmentWhereUniqueInput
  }

  /**
   * BusAssignment findUniqueOrThrow
   */
  export type BusAssignmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusAssignment
     */
    select?: BusAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusAssignment
     */
    omit?: BusAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which BusAssignment to fetch.
     */
    where: BusAssignmentWhereUniqueInput
  }

  /**
   * BusAssignment findFirst
   */
  export type BusAssignmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusAssignment
     */
    select?: BusAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusAssignment
     */
    omit?: BusAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which BusAssignment to fetch.
     */
    where?: BusAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusAssignments to fetch.
     */
    orderBy?: BusAssignmentOrderByWithRelationInput | BusAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusAssignments.
     */
    cursor?: BusAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusAssignments.
     */
    distinct?: BusAssignmentScalarFieldEnum | BusAssignmentScalarFieldEnum[]
  }

  /**
   * BusAssignment findFirstOrThrow
   */
  export type BusAssignmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusAssignment
     */
    select?: BusAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusAssignment
     */
    omit?: BusAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which BusAssignment to fetch.
     */
    where?: BusAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusAssignments to fetch.
     */
    orderBy?: BusAssignmentOrderByWithRelationInput | BusAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusAssignments.
     */
    cursor?: BusAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusAssignments.
     */
    distinct?: BusAssignmentScalarFieldEnum | BusAssignmentScalarFieldEnum[]
  }

  /**
   * BusAssignment findMany
   */
  export type BusAssignmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusAssignment
     */
    select?: BusAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusAssignment
     */
    omit?: BusAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which BusAssignments to fetch.
     */
    where?: BusAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusAssignments to fetch.
     */
    orderBy?: BusAssignmentOrderByWithRelationInput | BusAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BusAssignments.
     */
    cursor?: BusAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusAssignments.
     */
    skip?: number
    distinct?: BusAssignmentScalarFieldEnum | BusAssignmentScalarFieldEnum[]
  }

  /**
   * BusAssignment create
   */
  export type BusAssignmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusAssignment
     */
    select?: BusAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusAssignment
     */
    omit?: BusAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to create a BusAssignment.
     */
    data: XOR<BusAssignmentCreateInput, BusAssignmentUncheckedCreateInput>
  }

  /**
   * BusAssignment createMany
   */
  export type BusAssignmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BusAssignments.
     */
    data: BusAssignmentCreateManyInput | BusAssignmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BusAssignment createManyAndReturn
   */
  export type BusAssignmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusAssignment
     */
    select?: BusAssignmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BusAssignment
     */
    omit?: BusAssignmentOmit<ExtArgs> | null
    /**
     * The data used to create many BusAssignments.
     */
    data: BusAssignmentCreateManyInput | BusAssignmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusAssignmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BusAssignment update
   */
  export type BusAssignmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusAssignment
     */
    select?: BusAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusAssignment
     */
    omit?: BusAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to update a BusAssignment.
     */
    data: XOR<BusAssignmentUpdateInput, BusAssignmentUncheckedUpdateInput>
    /**
     * Choose, which BusAssignment to update.
     */
    where: BusAssignmentWhereUniqueInput
  }

  /**
   * BusAssignment updateMany
   */
  export type BusAssignmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BusAssignments.
     */
    data: XOR<BusAssignmentUpdateManyMutationInput, BusAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which BusAssignments to update
     */
    where?: BusAssignmentWhereInput
    /**
     * Limit how many BusAssignments to update.
     */
    limit?: number
  }

  /**
   * BusAssignment updateManyAndReturn
   */
  export type BusAssignmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusAssignment
     */
    select?: BusAssignmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BusAssignment
     */
    omit?: BusAssignmentOmit<ExtArgs> | null
    /**
     * The data used to update BusAssignments.
     */
    data: XOR<BusAssignmentUpdateManyMutationInput, BusAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which BusAssignments to update
     */
    where?: BusAssignmentWhereInput
    /**
     * Limit how many BusAssignments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusAssignmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BusAssignment upsert
   */
  export type BusAssignmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusAssignment
     */
    select?: BusAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusAssignment
     */
    omit?: BusAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusAssignmentInclude<ExtArgs> | null
    /**
     * The filter to search for the BusAssignment to update in case it exists.
     */
    where: BusAssignmentWhereUniqueInput
    /**
     * In case the BusAssignment found by the `where` argument doesn't exist, create a new BusAssignment with this data.
     */
    create: XOR<BusAssignmentCreateInput, BusAssignmentUncheckedCreateInput>
    /**
     * In case the BusAssignment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BusAssignmentUpdateInput, BusAssignmentUncheckedUpdateInput>
  }

  /**
   * BusAssignment delete
   */
  export type BusAssignmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusAssignment
     */
    select?: BusAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusAssignment
     */
    omit?: BusAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusAssignmentInclude<ExtArgs> | null
    /**
     * Filter which BusAssignment to delete.
     */
    where: BusAssignmentWhereUniqueInput
  }

  /**
   * BusAssignment deleteMany
   */
  export type BusAssignmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BusAssignments to delete
     */
    where?: BusAssignmentWhereInput
    /**
     * Limit how many BusAssignments to delete.
     */
    limit?: number
  }

  /**
   * BusAssignment.RegularBusAssignment
   */
  export type BusAssignment$RegularBusAssignmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegularBusAssignment
     */
    select?: RegularBusAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegularBusAssignment
     */
    omit?: RegularBusAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegularBusAssignmentInclude<ExtArgs> | null
    where?: RegularBusAssignmentWhereInput
  }

  /**
   * BusAssignment without action
   */
  export type BusAssignmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusAssignment
     */
    select?: BusAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusAssignment
     */
    omit?: BusAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusAssignmentInclude<ExtArgs> | null
  }


  /**
   * Model RegularBusAssignment
   */

  export type AggregateRegularBusAssignment = {
    _count: RegularBusAssignmentCountAggregateOutputType | null
    _avg: RegularBusAssignmentAvgAggregateOutputType | null
    _sum: RegularBusAssignmentSumAggregateOutputType | null
    _min: RegularBusAssignmentMinAggregateOutputType | null
    _max: RegularBusAssignmentMaxAggregateOutputType | null
  }

  export type RegularBusAssignmentAvgAggregateOutputType = {
    Change: number | null
    TripRevenue: number | null
  }

  export type RegularBusAssignmentSumAggregateOutputType = {
    Change: number | null
    TripRevenue: number | null
  }

  export type RegularBusAssignmentMinAggregateOutputType = {
    RegularBusAssignmentID: string | null
    DriverID: string | null
    ConductorID: string | null
    QuotaPolicyID: string | null
    Change: number | null
    TripRevenue: number | null
  }

  export type RegularBusAssignmentMaxAggregateOutputType = {
    RegularBusAssignmentID: string | null
    DriverID: string | null
    ConductorID: string | null
    QuotaPolicyID: string | null
    Change: number | null
    TripRevenue: number | null
  }

  export type RegularBusAssignmentCountAggregateOutputType = {
    RegularBusAssignmentID: number
    DriverID: number
    ConductorID: number
    QuotaPolicyID: number
    Change: number
    TripRevenue: number
    _all: number
  }


  export type RegularBusAssignmentAvgAggregateInputType = {
    Change?: true
    TripRevenue?: true
  }

  export type RegularBusAssignmentSumAggregateInputType = {
    Change?: true
    TripRevenue?: true
  }

  export type RegularBusAssignmentMinAggregateInputType = {
    RegularBusAssignmentID?: true
    DriverID?: true
    ConductorID?: true
    QuotaPolicyID?: true
    Change?: true
    TripRevenue?: true
  }

  export type RegularBusAssignmentMaxAggregateInputType = {
    RegularBusAssignmentID?: true
    DriverID?: true
    ConductorID?: true
    QuotaPolicyID?: true
    Change?: true
    TripRevenue?: true
  }

  export type RegularBusAssignmentCountAggregateInputType = {
    RegularBusAssignmentID?: true
    DriverID?: true
    ConductorID?: true
    QuotaPolicyID?: true
    Change?: true
    TripRevenue?: true
    _all?: true
  }

  export type RegularBusAssignmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RegularBusAssignment to aggregate.
     */
    where?: RegularBusAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegularBusAssignments to fetch.
     */
    orderBy?: RegularBusAssignmentOrderByWithRelationInput | RegularBusAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RegularBusAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegularBusAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegularBusAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RegularBusAssignments
    **/
    _count?: true | RegularBusAssignmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RegularBusAssignmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RegularBusAssignmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegularBusAssignmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegularBusAssignmentMaxAggregateInputType
  }

  export type GetRegularBusAssignmentAggregateType<T extends RegularBusAssignmentAggregateArgs> = {
        [P in keyof T & keyof AggregateRegularBusAssignment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegularBusAssignment[P]>
      : GetScalarType<T[P], AggregateRegularBusAssignment[P]>
  }




  export type RegularBusAssignmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegularBusAssignmentWhereInput
    orderBy?: RegularBusAssignmentOrderByWithAggregationInput | RegularBusAssignmentOrderByWithAggregationInput[]
    by: RegularBusAssignmentScalarFieldEnum[] | RegularBusAssignmentScalarFieldEnum
    having?: RegularBusAssignmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegularBusAssignmentCountAggregateInputType | true
    _avg?: RegularBusAssignmentAvgAggregateInputType
    _sum?: RegularBusAssignmentSumAggregateInputType
    _min?: RegularBusAssignmentMinAggregateInputType
    _max?: RegularBusAssignmentMaxAggregateInputType
  }

  export type RegularBusAssignmentGroupByOutputType = {
    RegularBusAssignmentID: string
    DriverID: string
    ConductorID: string
    QuotaPolicyID: string
    Change: number
    TripRevenue: number
    _count: RegularBusAssignmentCountAggregateOutputType | null
    _avg: RegularBusAssignmentAvgAggregateOutputType | null
    _sum: RegularBusAssignmentSumAggregateOutputType | null
    _min: RegularBusAssignmentMinAggregateOutputType | null
    _max: RegularBusAssignmentMaxAggregateOutputType | null
  }

  type GetRegularBusAssignmentGroupByPayload<T extends RegularBusAssignmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegularBusAssignmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegularBusAssignmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegularBusAssignmentGroupByOutputType[P]>
            : GetScalarType<T[P], RegularBusAssignmentGroupByOutputType[P]>
        }
      >
    >


  export type RegularBusAssignmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    RegularBusAssignmentID?: boolean
    DriverID?: boolean
    ConductorID?: boolean
    QuotaPolicyID?: boolean
    Change?: boolean
    TripRevenue?: boolean
    quotaPolicy?: boolean | Quota_PolicyDefaultArgs<ExtArgs>
    BusAssignment?: boolean | BusAssignmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["regularBusAssignment"]>

  export type RegularBusAssignmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    RegularBusAssignmentID?: boolean
    DriverID?: boolean
    ConductorID?: boolean
    QuotaPolicyID?: boolean
    Change?: boolean
    TripRevenue?: boolean
    quotaPolicy?: boolean | Quota_PolicyDefaultArgs<ExtArgs>
    BusAssignment?: boolean | BusAssignmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["regularBusAssignment"]>

  export type RegularBusAssignmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    RegularBusAssignmentID?: boolean
    DriverID?: boolean
    ConductorID?: boolean
    QuotaPolicyID?: boolean
    Change?: boolean
    TripRevenue?: boolean
    quotaPolicy?: boolean | Quota_PolicyDefaultArgs<ExtArgs>
    BusAssignment?: boolean | BusAssignmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["regularBusAssignment"]>

  export type RegularBusAssignmentSelectScalar = {
    RegularBusAssignmentID?: boolean
    DriverID?: boolean
    ConductorID?: boolean
    QuotaPolicyID?: boolean
    Change?: boolean
    TripRevenue?: boolean
  }

  export type RegularBusAssignmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"RegularBusAssignmentID" | "DriverID" | "ConductorID" | "QuotaPolicyID" | "Change" | "TripRevenue", ExtArgs["result"]["regularBusAssignment"]>
  export type RegularBusAssignmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quotaPolicy?: boolean | Quota_PolicyDefaultArgs<ExtArgs>
    BusAssignment?: boolean | BusAssignmentDefaultArgs<ExtArgs>
  }
  export type RegularBusAssignmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quotaPolicy?: boolean | Quota_PolicyDefaultArgs<ExtArgs>
    BusAssignment?: boolean | BusAssignmentDefaultArgs<ExtArgs>
  }
  export type RegularBusAssignmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quotaPolicy?: boolean | Quota_PolicyDefaultArgs<ExtArgs>
    BusAssignment?: boolean | BusAssignmentDefaultArgs<ExtArgs>
  }

  export type $RegularBusAssignmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RegularBusAssignment"
    objects: {
      quotaPolicy: Prisma.$Quota_PolicyPayload<ExtArgs>
      BusAssignment: Prisma.$BusAssignmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      RegularBusAssignmentID: string
      DriverID: string
      ConductorID: string
      QuotaPolicyID: string
      Change: number
      TripRevenue: number
    }, ExtArgs["result"]["regularBusAssignment"]>
    composites: {}
  }

  type RegularBusAssignmentGetPayload<S extends boolean | null | undefined | RegularBusAssignmentDefaultArgs> = $Result.GetResult<Prisma.$RegularBusAssignmentPayload, S>

  type RegularBusAssignmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RegularBusAssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RegularBusAssignmentCountAggregateInputType | true
    }

  export interface RegularBusAssignmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RegularBusAssignment'], meta: { name: 'RegularBusAssignment' } }
    /**
     * Find zero or one RegularBusAssignment that matches the filter.
     * @param {RegularBusAssignmentFindUniqueArgs} args - Arguments to find a RegularBusAssignment
     * @example
     * // Get one RegularBusAssignment
     * const regularBusAssignment = await prisma.regularBusAssignment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RegularBusAssignmentFindUniqueArgs>(args: SelectSubset<T, RegularBusAssignmentFindUniqueArgs<ExtArgs>>): Prisma__RegularBusAssignmentClient<$Result.GetResult<Prisma.$RegularBusAssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RegularBusAssignment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RegularBusAssignmentFindUniqueOrThrowArgs} args - Arguments to find a RegularBusAssignment
     * @example
     * // Get one RegularBusAssignment
     * const regularBusAssignment = await prisma.regularBusAssignment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RegularBusAssignmentFindUniqueOrThrowArgs>(args: SelectSubset<T, RegularBusAssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RegularBusAssignmentClient<$Result.GetResult<Prisma.$RegularBusAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RegularBusAssignment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegularBusAssignmentFindFirstArgs} args - Arguments to find a RegularBusAssignment
     * @example
     * // Get one RegularBusAssignment
     * const regularBusAssignment = await prisma.regularBusAssignment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RegularBusAssignmentFindFirstArgs>(args?: SelectSubset<T, RegularBusAssignmentFindFirstArgs<ExtArgs>>): Prisma__RegularBusAssignmentClient<$Result.GetResult<Prisma.$RegularBusAssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RegularBusAssignment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegularBusAssignmentFindFirstOrThrowArgs} args - Arguments to find a RegularBusAssignment
     * @example
     * // Get one RegularBusAssignment
     * const regularBusAssignment = await prisma.regularBusAssignment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RegularBusAssignmentFindFirstOrThrowArgs>(args?: SelectSubset<T, RegularBusAssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__RegularBusAssignmentClient<$Result.GetResult<Prisma.$RegularBusAssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RegularBusAssignments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegularBusAssignmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RegularBusAssignments
     * const regularBusAssignments = await prisma.regularBusAssignment.findMany()
     * 
     * // Get first 10 RegularBusAssignments
     * const regularBusAssignments = await prisma.regularBusAssignment.findMany({ take: 10 })
     * 
     * // Only select the `RegularBusAssignmentID`
     * const regularBusAssignmentWithRegularBusAssignmentIDOnly = await prisma.regularBusAssignment.findMany({ select: { RegularBusAssignmentID: true } })
     * 
     */
    findMany<T extends RegularBusAssignmentFindManyArgs>(args?: SelectSubset<T, RegularBusAssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegularBusAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RegularBusAssignment.
     * @param {RegularBusAssignmentCreateArgs} args - Arguments to create a RegularBusAssignment.
     * @example
     * // Create one RegularBusAssignment
     * const RegularBusAssignment = await prisma.regularBusAssignment.create({
     *   data: {
     *     // ... data to create a RegularBusAssignment
     *   }
     * })
     * 
     */
    create<T extends RegularBusAssignmentCreateArgs>(args: SelectSubset<T, RegularBusAssignmentCreateArgs<ExtArgs>>): Prisma__RegularBusAssignmentClient<$Result.GetResult<Prisma.$RegularBusAssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RegularBusAssignments.
     * @param {RegularBusAssignmentCreateManyArgs} args - Arguments to create many RegularBusAssignments.
     * @example
     * // Create many RegularBusAssignments
     * const regularBusAssignment = await prisma.regularBusAssignment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RegularBusAssignmentCreateManyArgs>(args?: SelectSubset<T, RegularBusAssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RegularBusAssignments and returns the data saved in the database.
     * @param {RegularBusAssignmentCreateManyAndReturnArgs} args - Arguments to create many RegularBusAssignments.
     * @example
     * // Create many RegularBusAssignments
     * const regularBusAssignment = await prisma.regularBusAssignment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RegularBusAssignments and only return the `RegularBusAssignmentID`
     * const regularBusAssignmentWithRegularBusAssignmentIDOnly = await prisma.regularBusAssignment.createManyAndReturn({
     *   select: { RegularBusAssignmentID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RegularBusAssignmentCreateManyAndReturnArgs>(args?: SelectSubset<T, RegularBusAssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegularBusAssignmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RegularBusAssignment.
     * @param {RegularBusAssignmentDeleteArgs} args - Arguments to delete one RegularBusAssignment.
     * @example
     * // Delete one RegularBusAssignment
     * const RegularBusAssignment = await prisma.regularBusAssignment.delete({
     *   where: {
     *     // ... filter to delete one RegularBusAssignment
     *   }
     * })
     * 
     */
    delete<T extends RegularBusAssignmentDeleteArgs>(args: SelectSubset<T, RegularBusAssignmentDeleteArgs<ExtArgs>>): Prisma__RegularBusAssignmentClient<$Result.GetResult<Prisma.$RegularBusAssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RegularBusAssignment.
     * @param {RegularBusAssignmentUpdateArgs} args - Arguments to update one RegularBusAssignment.
     * @example
     * // Update one RegularBusAssignment
     * const regularBusAssignment = await prisma.regularBusAssignment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RegularBusAssignmentUpdateArgs>(args: SelectSubset<T, RegularBusAssignmentUpdateArgs<ExtArgs>>): Prisma__RegularBusAssignmentClient<$Result.GetResult<Prisma.$RegularBusAssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RegularBusAssignments.
     * @param {RegularBusAssignmentDeleteManyArgs} args - Arguments to filter RegularBusAssignments to delete.
     * @example
     * // Delete a few RegularBusAssignments
     * const { count } = await prisma.regularBusAssignment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RegularBusAssignmentDeleteManyArgs>(args?: SelectSubset<T, RegularBusAssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RegularBusAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegularBusAssignmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RegularBusAssignments
     * const regularBusAssignment = await prisma.regularBusAssignment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RegularBusAssignmentUpdateManyArgs>(args: SelectSubset<T, RegularBusAssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RegularBusAssignments and returns the data updated in the database.
     * @param {RegularBusAssignmentUpdateManyAndReturnArgs} args - Arguments to update many RegularBusAssignments.
     * @example
     * // Update many RegularBusAssignments
     * const regularBusAssignment = await prisma.regularBusAssignment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RegularBusAssignments and only return the `RegularBusAssignmentID`
     * const regularBusAssignmentWithRegularBusAssignmentIDOnly = await prisma.regularBusAssignment.updateManyAndReturn({
     *   select: { RegularBusAssignmentID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RegularBusAssignmentUpdateManyAndReturnArgs>(args: SelectSubset<T, RegularBusAssignmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegularBusAssignmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RegularBusAssignment.
     * @param {RegularBusAssignmentUpsertArgs} args - Arguments to update or create a RegularBusAssignment.
     * @example
     * // Update or create a RegularBusAssignment
     * const regularBusAssignment = await prisma.regularBusAssignment.upsert({
     *   create: {
     *     // ... data to create a RegularBusAssignment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RegularBusAssignment we want to update
     *   }
     * })
     */
    upsert<T extends RegularBusAssignmentUpsertArgs>(args: SelectSubset<T, RegularBusAssignmentUpsertArgs<ExtArgs>>): Prisma__RegularBusAssignmentClient<$Result.GetResult<Prisma.$RegularBusAssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RegularBusAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegularBusAssignmentCountArgs} args - Arguments to filter RegularBusAssignments to count.
     * @example
     * // Count the number of RegularBusAssignments
     * const count = await prisma.regularBusAssignment.count({
     *   where: {
     *     // ... the filter for the RegularBusAssignments we want to count
     *   }
     * })
    **/
    count<T extends RegularBusAssignmentCountArgs>(
      args?: Subset<T, RegularBusAssignmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegularBusAssignmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RegularBusAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegularBusAssignmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RegularBusAssignmentAggregateArgs>(args: Subset<T, RegularBusAssignmentAggregateArgs>): Prisma.PrismaPromise<GetRegularBusAssignmentAggregateType<T>>

    /**
     * Group by RegularBusAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegularBusAssignmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RegularBusAssignmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RegularBusAssignmentGroupByArgs['orderBy'] }
        : { orderBy?: RegularBusAssignmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RegularBusAssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegularBusAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RegularBusAssignment model
   */
  readonly fields: RegularBusAssignmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RegularBusAssignment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RegularBusAssignmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quotaPolicy<T extends Quota_PolicyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, Quota_PolicyDefaultArgs<ExtArgs>>): Prisma__Quota_PolicyClient<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    BusAssignment<T extends BusAssignmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BusAssignmentDefaultArgs<ExtArgs>>): Prisma__BusAssignmentClient<$Result.GetResult<Prisma.$BusAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RegularBusAssignment model
   */
  interface RegularBusAssignmentFieldRefs {
    readonly RegularBusAssignmentID: FieldRef<"RegularBusAssignment", 'String'>
    readonly DriverID: FieldRef<"RegularBusAssignment", 'String'>
    readonly ConductorID: FieldRef<"RegularBusAssignment", 'String'>
    readonly QuotaPolicyID: FieldRef<"RegularBusAssignment", 'String'>
    readonly Change: FieldRef<"RegularBusAssignment", 'Float'>
    readonly TripRevenue: FieldRef<"RegularBusAssignment", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * RegularBusAssignment findUnique
   */
  export type RegularBusAssignmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegularBusAssignment
     */
    select?: RegularBusAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegularBusAssignment
     */
    omit?: RegularBusAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegularBusAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which RegularBusAssignment to fetch.
     */
    where: RegularBusAssignmentWhereUniqueInput
  }

  /**
   * RegularBusAssignment findUniqueOrThrow
   */
  export type RegularBusAssignmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegularBusAssignment
     */
    select?: RegularBusAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegularBusAssignment
     */
    omit?: RegularBusAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegularBusAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which RegularBusAssignment to fetch.
     */
    where: RegularBusAssignmentWhereUniqueInput
  }

  /**
   * RegularBusAssignment findFirst
   */
  export type RegularBusAssignmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegularBusAssignment
     */
    select?: RegularBusAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegularBusAssignment
     */
    omit?: RegularBusAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegularBusAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which RegularBusAssignment to fetch.
     */
    where?: RegularBusAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegularBusAssignments to fetch.
     */
    orderBy?: RegularBusAssignmentOrderByWithRelationInput | RegularBusAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RegularBusAssignments.
     */
    cursor?: RegularBusAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegularBusAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegularBusAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RegularBusAssignments.
     */
    distinct?: RegularBusAssignmentScalarFieldEnum | RegularBusAssignmentScalarFieldEnum[]
  }

  /**
   * RegularBusAssignment findFirstOrThrow
   */
  export type RegularBusAssignmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegularBusAssignment
     */
    select?: RegularBusAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegularBusAssignment
     */
    omit?: RegularBusAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegularBusAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which RegularBusAssignment to fetch.
     */
    where?: RegularBusAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegularBusAssignments to fetch.
     */
    orderBy?: RegularBusAssignmentOrderByWithRelationInput | RegularBusAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RegularBusAssignments.
     */
    cursor?: RegularBusAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegularBusAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegularBusAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RegularBusAssignments.
     */
    distinct?: RegularBusAssignmentScalarFieldEnum | RegularBusAssignmentScalarFieldEnum[]
  }

  /**
   * RegularBusAssignment findMany
   */
  export type RegularBusAssignmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegularBusAssignment
     */
    select?: RegularBusAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegularBusAssignment
     */
    omit?: RegularBusAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegularBusAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which RegularBusAssignments to fetch.
     */
    where?: RegularBusAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegularBusAssignments to fetch.
     */
    orderBy?: RegularBusAssignmentOrderByWithRelationInput | RegularBusAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RegularBusAssignments.
     */
    cursor?: RegularBusAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegularBusAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegularBusAssignments.
     */
    skip?: number
    distinct?: RegularBusAssignmentScalarFieldEnum | RegularBusAssignmentScalarFieldEnum[]
  }

  /**
   * RegularBusAssignment create
   */
  export type RegularBusAssignmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegularBusAssignment
     */
    select?: RegularBusAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegularBusAssignment
     */
    omit?: RegularBusAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegularBusAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to create a RegularBusAssignment.
     */
    data: XOR<RegularBusAssignmentCreateInput, RegularBusAssignmentUncheckedCreateInput>
  }

  /**
   * RegularBusAssignment createMany
   */
  export type RegularBusAssignmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RegularBusAssignments.
     */
    data: RegularBusAssignmentCreateManyInput | RegularBusAssignmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RegularBusAssignment createManyAndReturn
   */
  export type RegularBusAssignmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegularBusAssignment
     */
    select?: RegularBusAssignmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RegularBusAssignment
     */
    omit?: RegularBusAssignmentOmit<ExtArgs> | null
    /**
     * The data used to create many RegularBusAssignments.
     */
    data: RegularBusAssignmentCreateManyInput | RegularBusAssignmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegularBusAssignmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RegularBusAssignment update
   */
  export type RegularBusAssignmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegularBusAssignment
     */
    select?: RegularBusAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegularBusAssignment
     */
    omit?: RegularBusAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegularBusAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to update a RegularBusAssignment.
     */
    data: XOR<RegularBusAssignmentUpdateInput, RegularBusAssignmentUncheckedUpdateInput>
    /**
     * Choose, which RegularBusAssignment to update.
     */
    where: RegularBusAssignmentWhereUniqueInput
  }

  /**
   * RegularBusAssignment updateMany
   */
  export type RegularBusAssignmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RegularBusAssignments.
     */
    data: XOR<RegularBusAssignmentUpdateManyMutationInput, RegularBusAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which RegularBusAssignments to update
     */
    where?: RegularBusAssignmentWhereInput
    /**
     * Limit how many RegularBusAssignments to update.
     */
    limit?: number
  }

  /**
   * RegularBusAssignment updateManyAndReturn
   */
  export type RegularBusAssignmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegularBusAssignment
     */
    select?: RegularBusAssignmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RegularBusAssignment
     */
    omit?: RegularBusAssignmentOmit<ExtArgs> | null
    /**
     * The data used to update RegularBusAssignments.
     */
    data: XOR<RegularBusAssignmentUpdateManyMutationInput, RegularBusAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which RegularBusAssignments to update
     */
    where?: RegularBusAssignmentWhereInput
    /**
     * Limit how many RegularBusAssignments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegularBusAssignmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RegularBusAssignment upsert
   */
  export type RegularBusAssignmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegularBusAssignment
     */
    select?: RegularBusAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegularBusAssignment
     */
    omit?: RegularBusAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegularBusAssignmentInclude<ExtArgs> | null
    /**
     * The filter to search for the RegularBusAssignment to update in case it exists.
     */
    where: RegularBusAssignmentWhereUniqueInput
    /**
     * In case the RegularBusAssignment found by the `where` argument doesn't exist, create a new RegularBusAssignment with this data.
     */
    create: XOR<RegularBusAssignmentCreateInput, RegularBusAssignmentUncheckedCreateInput>
    /**
     * In case the RegularBusAssignment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RegularBusAssignmentUpdateInput, RegularBusAssignmentUncheckedUpdateInput>
  }

  /**
   * RegularBusAssignment delete
   */
  export type RegularBusAssignmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegularBusAssignment
     */
    select?: RegularBusAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegularBusAssignment
     */
    omit?: RegularBusAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegularBusAssignmentInclude<ExtArgs> | null
    /**
     * Filter which RegularBusAssignment to delete.
     */
    where: RegularBusAssignmentWhereUniqueInput
  }

  /**
   * RegularBusAssignment deleteMany
   */
  export type RegularBusAssignmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RegularBusAssignments to delete
     */
    where?: RegularBusAssignmentWhereInput
    /**
     * Limit how many RegularBusAssignments to delete.
     */
    limit?: number
  }

  /**
   * RegularBusAssignment without action
   */
  export type RegularBusAssignmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegularBusAssignment
     */
    select?: RegularBusAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegularBusAssignment
     */
    omit?: RegularBusAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegularBusAssignmentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Quota_PolicyScalarFieldEnum: {
    QuotaPolicyID: 'QuotaPolicyID',
    StartDate: 'StartDate',
    EndDate: 'EndDate'
  };

  export type Quota_PolicyScalarFieldEnum = (typeof Quota_PolicyScalarFieldEnum)[keyof typeof Quota_PolicyScalarFieldEnum]


  export const FixedScalarFieldEnum: {
    FQuotaPolicyID: 'FQuotaPolicyID',
    Quota: 'Quota'
  };

  export type FixedScalarFieldEnum = (typeof FixedScalarFieldEnum)[keyof typeof FixedScalarFieldEnum]


  export const PercentageScalarFieldEnum: {
    PQuotaPolicyID: 'PQuotaPolicyID',
    Percentage: 'Percentage'
  };

  export type PercentageScalarFieldEnum = (typeof PercentageScalarFieldEnum)[keyof typeof PercentageScalarFieldEnum]


  export const StopScalarFieldEnum: {
    StopID: 'StopID',
    StopName: 'StopName',
    latitude: 'latitude',
    longitude: 'longitude',
    IsDeleted: 'IsDeleted'
  };

  export type StopScalarFieldEnum = (typeof StopScalarFieldEnum)[keyof typeof StopScalarFieldEnum]


  export const RouteScalarFieldEnum: {
    RouteID: 'RouteID',
    StartStopID: 'StartStopID',
    EndStopID: 'EndStopID',
    RouteName: 'RouteName',
    IsDeleted: 'IsDeleted'
  };

  export type RouteScalarFieldEnum = (typeof RouteScalarFieldEnum)[keyof typeof RouteScalarFieldEnum]


  export const RouteStopScalarFieldEnum: {
    RouteStopID: 'RouteStopID',
    RouteID: 'RouteID',
    StopID: 'StopID',
    StopOrder: 'StopOrder'
  };

  export type RouteStopScalarFieldEnum = (typeof RouteStopScalarFieldEnum)[keyof typeof RouteStopScalarFieldEnum]


  export const BusAssignmentScalarFieldEnum: {
    BusAssignmentID: 'BusAssignmentID',
    BusID: 'BusID',
    RouteID: 'RouteID',
    AssignmentDate: 'AssignmentDate',
    Battery: 'Battery',
    Lights: 'Lights',
    Oil: 'Oil',
    Water: 'Water',
    Break: 'Break',
    Air: 'Air',
    Gas: 'Gas',
    Engine: 'Engine',
    TireCondition: 'TireCondition',
    Self_Driver: 'Self_Driver',
    Self_Conductor: 'Self_Conductor',
    IsDeleted: 'IsDeleted',
    Status: 'Status'
  };

  export type BusAssignmentScalarFieldEnum = (typeof BusAssignmentScalarFieldEnum)[keyof typeof BusAssignmentScalarFieldEnum]


  export const RegularBusAssignmentScalarFieldEnum: {
    RegularBusAssignmentID: 'RegularBusAssignmentID',
    DriverID: 'DriverID',
    ConductorID: 'ConductorID',
    QuotaPolicyID: 'QuotaPolicyID',
    Change: 'Change',
    TripRevenue: 'TripRevenue'
  };

  export type RegularBusAssignmentScalarFieldEnum = (typeof RegularBusAssignmentScalarFieldEnum)[keyof typeof RegularBusAssignmentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BusOperationStatus'
   */
  export type EnumBusOperationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BusOperationStatus'>
    


  /**
   * Reference to a field of type 'BusOperationStatus[]'
   */
  export type ListEnumBusOperationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BusOperationStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type Quota_PolicyWhereInput = {
    AND?: Quota_PolicyWhereInput | Quota_PolicyWhereInput[]
    OR?: Quota_PolicyWhereInput[]
    NOT?: Quota_PolicyWhereInput | Quota_PolicyWhereInput[]
    QuotaPolicyID?: StringFilter<"Quota_Policy"> | string
    StartDate?: DateTimeFilter<"Quota_Policy"> | Date | string
    EndDate?: DateTimeFilter<"Quota_Policy"> | Date | string
    Fixed?: XOR<FixedNullableScalarRelationFilter, FixedWhereInput> | null
    Percentage?: XOR<PercentageNullableScalarRelationFilter, PercentageWhereInput> | null
    RegularBusAssignments?: RegularBusAssignmentListRelationFilter
  }

  export type Quota_PolicyOrderByWithRelationInput = {
    QuotaPolicyID?: SortOrder
    StartDate?: SortOrder
    EndDate?: SortOrder
    Fixed?: FixedOrderByWithRelationInput
    Percentage?: PercentageOrderByWithRelationInput
    RegularBusAssignments?: RegularBusAssignmentOrderByRelationAggregateInput
  }

  export type Quota_PolicyWhereUniqueInput = Prisma.AtLeast<{
    QuotaPolicyID?: string
    AND?: Quota_PolicyWhereInput | Quota_PolicyWhereInput[]
    OR?: Quota_PolicyWhereInput[]
    NOT?: Quota_PolicyWhereInput | Quota_PolicyWhereInput[]
    StartDate?: DateTimeFilter<"Quota_Policy"> | Date | string
    EndDate?: DateTimeFilter<"Quota_Policy"> | Date | string
    Fixed?: XOR<FixedNullableScalarRelationFilter, FixedWhereInput> | null
    Percentage?: XOR<PercentageNullableScalarRelationFilter, PercentageWhereInput> | null
    RegularBusAssignments?: RegularBusAssignmentListRelationFilter
  }, "QuotaPolicyID">

  export type Quota_PolicyOrderByWithAggregationInput = {
    QuotaPolicyID?: SortOrder
    StartDate?: SortOrder
    EndDate?: SortOrder
    _count?: Quota_PolicyCountOrderByAggregateInput
    _max?: Quota_PolicyMaxOrderByAggregateInput
    _min?: Quota_PolicyMinOrderByAggregateInput
  }

  export type Quota_PolicyScalarWhereWithAggregatesInput = {
    AND?: Quota_PolicyScalarWhereWithAggregatesInput | Quota_PolicyScalarWhereWithAggregatesInput[]
    OR?: Quota_PolicyScalarWhereWithAggregatesInput[]
    NOT?: Quota_PolicyScalarWhereWithAggregatesInput | Quota_PolicyScalarWhereWithAggregatesInput[]
    QuotaPolicyID?: StringWithAggregatesFilter<"Quota_Policy"> | string
    StartDate?: DateTimeWithAggregatesFilter<"Quota_Policy"> | Date | string
    EndDate?: DateTimeWithAggregatesFilter<"Quota_Policy"> | Date | string
  }

  export type FixedWhereInput = {
    AND?: FixedWhereInput | FixedWhereInput[]
    OR?: FixedWhereInput[]
    NOT?: FixedWhereInput | FixedWhereInput[]
    FQuotaPolicyID?: StringFilter<"Fixed"> | string
    Quota?: FloatFilter<"Fixed"> | number
    quotaPolicy?: XOR<Quota_PolicyScalarRelationFilter, Quota_PolicyWhereInput>
  }

  export type FixedOrderByWithRelationInput = {
    FQuotaPolicyID?: SortOrder
    Quota?: SortOrder
    quotaPolicy?: Quota_PolicyOrderByWithRelationInput
  }

  export type FixedWhereUniqueInput = Prisma.AtLeast<{
    FQuotaPolicyID?: string
    AND?: FixedWhereInput | FixedWhereInput[]
    OR?: FixedWhereInput[]
    NOT?: FixedWhereInput | FixedWhereInput[]
    Quota?: FloatFilter<"Fixed"> | number
    quotaPolicy?: XOR<Quota_PolicyScalarRelationFilter, Quota_PolicyWhereInput>
  }, "FQuotaPolicyID">

  export type FixedOrderByWithAggregationInput = {
    FQuotaPolicyID?: SortOrder
    Quota?: SortOrder
    _count?: FixedCountOrderByAggregateInput
    _avg?: FixedAvgOrderByAggregateInput
    _max?: FixedMaxOrderByAggregateInput
    _min?: FixedMinOrderByAggregateInput
    _sum?: FixedSumOrderByAggregateInput
  }

  export type FixedScalarWhereWithAggregatesInput = {
    AND?: FixedScalarWhereWithAggregatesInput | FixedScalarWhereWithAggregatesInput[]
    OR?: FixedScalarWhereWithAggregatesInput[]
    NOT?: FixedScalarWhereWithAggregatesInput | FixedScalarWhereWithAggregatesInput[]
    FQuotaPolicyID?: StringWithAggregatesFilter<"Fixed"> | string
    Quota?: FloatWithAggregatesFilter<"Fixed"> | number
  }

  export type PercentageWhereInput = {
    AND?: PercentageWhereInput | PercentageWhereInput[]
    OR?: PercentageWhereInput[]
    NOT?: PercentageWhereInput | PercentageWhereInput[]
    PQuotaPolicyID?: StringFilter<"Percentage"> | string
    Percentage?: FloatFilter<"Percentage"> | number
    quotaPolicy?: XOR<Quota_PolicyScalarRelationFilter, Quota_PolicyWhereInput>
  }

  export type PercentageOrderByWithRelationInput = {
    PQuotaPolicyID?: SortOrder
    Percentage?: SortOrder
    quotaPolicy?: Quota_PolicyOrderByWithRelationInput
  }

  export type PercentageWhereUniqueInput = Prisma.AtLeast<{
    PQuotaPolicyID?: string
    AND?: PercentageWhereInput | PercentageWhereInput[]
    OR?: PercentageWhereInput[]
    NOT?: PercentageWhereInput | PercentageWhereInput[]
    Percentage?: FloatFilter<"Percentage"> | number
    quotaPolicy?: XOR<Quota_PolicyScalarRelationFilter, Quota_PolicyWhereInput>
  }, "PQuotaPolicyID">

  export type PercentageOrderByWithAggregationInput = {
    PQuotaPolicyID?: SortOrder
    Percentage?: SortOrder
    _count?: PercentageCountOrderByAggregateInput
    _avg?: PercentageAvgOrderByAggregateInput
    _max?: PercentageMaxOrderByAggregateInput
    _min?: PercentageMinOrderByAggregateInput
    _sum?: PercentageSumOrderByAggregateInput
  }

  export type PercentageScalarWhereWithAggregatesInput = {
    AND?: PercentageScalarWhereWithAggregatesInput | PercentageScalarWhereWithAggregatesInput[]
    OR?: PercentageScalarWhereWithAggregatesInput[]
    NOT?: PercentageScalarWhereWithAggregatesInput | PercentageScalarWhereWithAggregatesInput[]
    PQuotaPolicyID?: StringWithAggregatesFilter<"Percentage"> | string
    Percentage?: FloatWithAggregatesFilter<"Percentage"> | number
  }

  export type StopWhereInput = {
    AND?: StopWhereInput | StopWhereInput[]
    OR?: StopWhereInput[]
    NOT?: StopWhereInput | StopWhereInput[]
    StopID?: StringFilter<"Stop"> | string
    StopName?: StringFilter<"Stop"> | string
    latitude?: StringFilter<"Stop"> | string
    longitude?: StringFilter<"Stop"> | string
    IsDeleted?: BoolFilter<"Stop"> | boolean
    routesAsStart?: RouteListRelationFilter
    routesAsEnd?: RouteListRelationFilter
    RouteStops?: RouteStopListRelationFilter
  }

  export type StopOrderByWithRelationInput = {
    StopID?: SortOrder
    StopName?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    IsDeleted?: SortOrder
    routesAsStart?: RouteOrderByRelationAggregateInput
    routesAsEnd?: RouteOrderByRelationAggregateInput
    RouteStops?: RouteStopOrderByRelationAggregateInput
  }

  export type StopWhereUniqueInput = Prisma.AtLeast<{
    StopID?: string
    AND?: StopWhereInput | StopWhereInput[]
    OR?: StopWhereInput[]
    NOT?: StopWhereInput | StopWhereInput[]
    StopName?: StringFilter<"Stop"> | string
    latitude?: StringFilter<"Stop"> | string
    longitude?: StringFilter<"Stop"> | string
    IsDeleted?: BoolFilter<"Stop"> | boolean
    routesAsStart?: RouteListRelationFilter
    routesAsEnd?: RouteListRelationFilter
    RouteStops?: RouteStopListRelationFilter
  }, "StopID">

  export type StopOrderByWithAggregationInput = {
    StopID?: SortOrder
    StopName?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    IsDeleted?: SortOrder
    _count?: StopCountOrderByAggregateInput
    _max?: StopMaxOrderByAggregateInput
    _min?: StopMinOrderByAggregateInput
  }

  export type StopScalarWhereWithAggregatesInput = {
    AND?: StopScalarWhereWithAggregatesInput | StopScalarWhereWithAggregatesInput[]
    OR?: StopScalarWhereWithAggregatesInput[]
    NOT?: StopScalarWhereWithAggregatesInput | StopScalarWhereWithAggregatesInput[]
    StopID?: StringWithAggregatesFilter<"Stop"> | string
    StopName?: StringWithAggregatesFilter<"Stop"> | string
    latitude?: StringWithAggregatesFilter<"Stop"> | string
    longitude?: StringWithAggregatesFilter<"Stop"> | string
    IsDeleted?: BoolWithAggregatesFilter<"Stop"> | boolean
  }

  export type RouteWhereInput = {
    AND?: RouteWhereInput | RouteWhereInput[]
    OR?: RouteWhereInput[]
    NOT?: RouteWhereInput | RouteWhereInput[]
    RouteID?: StringFilter<"Route"> | string
    StartStopID?: StringFilter<"Route"> | string
    EndStopID?: StringFilter<"Route"> | string
    RouteName?: StringFilter<"Route"> | string
    IsDeleted?: BoolFilter<"Route"> | boolean
    StartStop?: XOR<StopScalarRelationFilter, StopWhereInput>
    EndStop?: XOR<StopScalarRelationFilter, StopWhereInput>
    RouteStops?: RouteStopListRelationFilter
    BusAssignments?: BusAssignmentListRelationFilter
  }

  export type RouteOrderByWithRelationInput = {
    RouteID?: SortOrder
    StartStopID?: SortOrder
    EndStopID?: SortOrder
    RouteName?: SortOrder
    IsDeleted?: SortOrder
    StartStop?: StopOrderByWithRelationInput
    EndStop?: StopOrderByWithRelationInput
    RouteStops?: RouteStopOrderByRelationAggregateInput
    BusAssignments?: BusAssignmentOrderByRelationAggregateInput
  }

  export type RouteWhereUniqueInput = Prisma.AtLeast<{
    RouteID?: string
    AND?: RouteWhereInput | RouteWhereInput[]
    OR?: RouteWhereInput[]
    NOT?: RouteWhereInput | RouteWhereInput[]
    StartStopID?: StringFilter<"Route"> | string
    EndStopID?: StringFilter<"Route"> | string
    RouteName?: StringFilter<"Route"> | string
    IsDeleted?: BoolFilter<"Route"> | boolean
    StartStop?: XOR<StopScalarRelationFilter, StopWhereInput>
    EndStop?: XOR<StopScalarRelationFilter, StopWhereInput>
    RouteStops?: RouteStopListRelationFilter
    BusAssignments?: BusAssignmentListRelationFilter
  }, "RouteID">

  export type RouteOrderByWithAggregationInput = {
    RouteID?: SortOrder
    StartStopID?: SortOrder
    EndStopID?: SortOrder
    RouteName?: SortOrder
    IsDeleted?: SortOrder
    _count?: RouteCountOrderByAggregateInput
    _max?: RouteMaxOrderByAggregateInput
    _min?: RouteMinOrderByAggregateInput
  }

  export type RouteScalarWhereWithAggregatesInput = {
    AND?: RouteScalarWhereWithAggregatesInput | RouteScalarWhereWithAggregatesInput[]
    OR?: RouteScalarWhereWithAggregatesInput[]
    NOT?: RouteScalarWhereWithAggregatesInput | RouteScalarWhereWithAggregatesInput[]
    RouteID?: StringWithAggregatesFilter<"Route"> | string
    StartStopID?: StringWithAggregatesFilter<"Route"> | string
    EndStopID?: StringWithAggregatesFilter<"Route"> | string
    RouteName?: StringWithAggregatesFilter<"Route"> | string
    IsDeleted?: BoolWithAggregatesFilter<"Route"> | boolean
  }

  export type RouteStopWhereInput = {
    AND?: RouteStopWhereInput | RouteStopWhereInput[]
    OR?: RouteStopWhereInput[]
    NOT?: RouteStopWhereInput | RouteStopWhereInput[]
    RouteStopID?: StringFilter<"RouteStop"> | string
    RouteID?: StringFilter<"RouteStop"> | string
    StopID?: StringFilter<"RouteStop"> | string
    StopOrder?: IntFilter<"RouteStop"> | number
    Route?: XOR<RouteScalarRelationFilter, RouteWhereInput>
    Stop?: XOR<StopScalarRelationFilter, StopWhereInput>
  }

  export type RouteStopOrderByWithRelationInput = {
    RouteStopID?: SortOrder
    RouteID?: SortOrder
    StopID?: SortOrder
    StopOrder?: SortOrder
    Route?: RouteOrderByWithRelationInput
    Stop?: StopOrderByWithRelationInput
  }

  export type RouteStopWhereUniqueInput = Prisma.AtLeast<{
    RouteStopID?: string
    RouteID_StopID?: RouteStopRouteIDStopIDCompoundUniqueInput
    AND?: RouteStopWhereInput | RouteStopWhereInput[]
    OR?: RouteStopWhereInput[]
    NOT?: RouteStopWhereInput | RouteStopWhereInput[]
    RouteID?: StringFilter<"RouteStop"> | string
    StopID?: StringFilter<"RouteStop"> | string
    StopOrder?: IntFilter<"RouteStop"> | number
    Route?: XOR<RouteScalarRelationFilter, RouteWhereInput>
    Stop?: XOR<StopScalarRelationFilter, StopWhereInput>
  }, "RouteStopID" | "RouteID_StopID">

  export type RouteStopOrderByWithAggregationInput = {
    RouteStopID?: SortOrder
    RouteID?: SortOrder
    StopID?: SortOrder
    StopOrder?: SortOrder
    _count?: RouteStopCountOrderByAggregateInput
    _avg?: RouteStopAvgOrderByAggregateInput
    _max?: RouteStopMaxOrderByAggregateInput
    _min?: RouteStopMinOrderByAggregateInput
    _sum?: RouteStopSumOrderByAggregateInput
  }

  export type RouteStopScalarWhereWithAggregatesInput = {
    AND?: RouteStopScalarWhereWithAggregatesInput | RouteStopScalarWhereWithAggregatesInput[]
    OR?: RouteStopScalarWhereWithAggregatesInput[]
    NOT?: RouteStopScalarWhereWithAggregatesInput | RouteStopScalarWhereWithAggregatesInput[]
    RouteStopID?: StringWithAggregatesFilter<"RouteStop"> | string
    RouteID?: StringWithAggregatesFilter<"RouteStop"> | string
    StopID?: StringWithAggregatesFilter<"RouteStop"> | string
    StopOrder?: IntWithAggregatesFilter<"RouteStop"> | number
  }

  export type BusAssignmentWhereInput = {
    AND?: BusAssignmentWhereInput | BusAssignmentWhereInput[]
    OR?: BusAssignmentWhereInput[]
    NOT?: BusAssignmentWhereInput | BusAssignmentWhereInput[]
    BusAssignmentID?: StringFilter<"BusAssignment"> | string
    BusID?: StringFilter<"BusAssignment"> | string
    RouteID?: StringFilter<"BusAssignment"> | string
    AssignmentDate?: DateTimeFilter<"BusAssignment"> | Date | string
    Battery?: BoolFilter<"BusAssignment"> | boolean
    Lights?: BoolFilter<"BusAssignment"> | boolean
    Oil?: BoolFilter<"BusAssignment"> | boolean
    Water?: BoolFilter<"BusAssignment"> | boolean
    Break?: BoolFilter<"BusAssignment"> | boolean
    Air?: BoolFilter<"BusAssignment"> | boolean
    Gas?: BoolFilter<"BusAssignment"> | boolean
    Engine?: BoolFilter<"BusAssignment"> | boolean
    TireCondition?: BoolFilter<"BusAssignment"> | boolean
    Self_Driver?: BoolFilter<"BusAssignment"> | boolean
    Self_Conductor?: BoolFilter<"BusAssignment"> | boolean
    IsDeleted?: BoolFilter<"BusAssignment"> | boolean
    Status?: EnumBusOperationStatusFilter<"BusAssignment"> | $Enums.BusOperationStatus
    Route?: XOR<RouteScalarRelationFilter, RouteWhereInput>
    RegularBusAssignment?: XOR<RegularBusAssignmentNullableScalarRelationFilter, RegularBusAssignmentWhereInput> | null
  }

  export type BusAssignmentOrderByWithRelationInput = {
    BusAssignmentID?: SortOrder
    BusID?: SortOrder
    RouteID?: SortOrder
    AssignmentDate?: SortOrder
    Battery?: SortOrder
    Lights?: SortOrder
    Oil?: SortOrder
    Water?: SortOrder
    Break?: SortOrder
    Air?: SortOrder
    Gas?: SortOrder
    Engine?: SortOrder
    TireCondition?: SortOrder
    Self_Driver?: SortOrder
    Self_Conductor?: SortOrder
    IsDeleted?: SortOrder
    Status?: SortOrder
    Route?: RouteOrderByWithRelationInput
    RegularBusAssignment?: RegularBusAssignmentOrderByWithRelationInput
  }

  export type BusAssignmentWhereUniqueInput = Prisma.AtLeast<{
    BusAssignmentID?: string
    AND?: BusAssignmentWhereInput | BusAssignmentWhereInput[]
    OR?: BusAssignmentWhereInput[]
    NOT?: BusAssignmentWhereInput | BusAssignmentWhereInput[]
    BusID?: StringFilter<"BusAssignment"> | string
    RouteID?: StringFilter<"BusAssignment"> | string
    AssignmentDate?: DateTimeFilter<"BusAssignment"> | Date | string
    Battery?: BoolFilter<"BusAssignment"> | boolean
    Lights?: BoolFilter<"BusAssignment"> | boolean
    Oil?: BoolFilter<"BusAssignment"> | boolean
    Water?: BoolFilter<"BusAssignment"> | boolean
    Break?: BoolFilter<"BusAssignment"> | boolean
    Air?: BoolFilter<"BusAssignment"> | boolean
    Gas?: BoolFilter<"BusAssignment"> | boolean
    Engine?: BoolFilter<"BusAssignment"> | boolean
    TireCondition?: BoolFilter<"BusAssignment"> | boolean
    Self_Driver?: BoolFilter<"BusAssignment"> | boolean
    Self_Conductor?: BoolFilter<"BusAssignment"> | boolean
    IsDeleted?: BoolFilter<"BusAssignment"> | boolean
    Status?: EnumBusOperationStatusFilter<"BusAssignment"> | $Enums.BusOperationStatus
    Route?: XOR<RouteScalarRelationFilter, RouteWhereInput>
    RegularBusAssignment?: XOR<RegularBusAssignmentNullableScalarRelationFilter, RegularBusAssignmentWhereInput> | null
  }, "BusAssignmentID">

  export type BusAssignmentOrderByWithAggregationInput = {
    BusAssignmentID?: SortOrder
    BusID?: SortOrder
    RouteID?: SortOrder
    AssignmentDate?: SortOrder
    Battery?: SortOrder
    Lights?: SortOrder
    Oil?: SortOrder
    Water?: SortOrder
    Break?: SortOrder
    Air?: SortOrder
    Gas?: SortOrder
    Engine?: SortOrder
    TireCondition?: SortOrder
    Self_Driver?: SortOrder
    Self_Conductor?: SortOrder
    IsDeleted?: SortOrder
    Status?: SortOrder
    _count?: BusAssignmentCountOrderByAggregateInput
    _max?: BusAssignmentMaxOrderByAggregateInput
    _min?: BusAssignmentMinOrderByAggregateInput
  }

  export type BusAssignmentScalarWhereWithAggregatesInput = {
    AND?: BusAssignmentScalarWhereWithAggregatesInput | BusAssignmentScalarWhereWithAggregatesInput[]
    OR?: BusAssignmentScalarWhereWithAggregatesInput[]
    NOT?: BusAssignmentScalarWhereWithAggregatesInput | BusAssignmentScalarWhereWithAggregatesInput[]
    BusAssignmentID?: StringWithAggregatesFilter<"BusAssignment"> | string
    BusID?: StringWithAggregatesFilter<"BusAssignment"> | string
    RouteID?: StringWithAggregatesFilter<"BusAssignment"> | string
    AssignmentDate?: DateTimeWithAggregatesFilter<"BusAssignment"> | Date | string
    Battery?: BoolWithAggregatesFilter<"BusAssignment"> | boolean
    Lights?: BoolWithAggregatesFilter<"BusAssignment"> | boolean
    Oil?: BoolWithAggregatesFilter<"BusAssignment"> | boolean
    Water?: BoolWithAggregatesFilter<"BusAssignment"> | boolean
    Break?: BoolWithAggregatesFilter<"BusAssignment"> | boolean
    Air?: BoolWithAggregatesFilter<"BusAssignment"> | boolean
    Gas?: BoolWithAggregatesFilter<"BusAssignment"> | boolean
    Engine?: BoolWithAggregatesFilter<"BusAssignment"> | boolean
    TireCondition?: BoolWithAggregatesFilter<"BusAssignment"> | boolean
    Self_Driver?: BoolWithAggregatesFilter<"BusAssignment"> | boolean
    Self_Conductor?: BoolWithAggregatesFilter<"BusAssignment"> | boolean
    IsDeleted?: BoolWithAggregatesFilter<"BusAssignment"> | boolean
    Status?: EnumBusOperationStatusWithAggregatesFilter<"BusAssignment"> | $Enums.BusOperationStatus
  }

  export type RegularBusAssignmentWhereInput = {
    AND?: RegularBusAssignmentWhereInput | RegularBusAssignmentWhereInput[]
    OR?: RegularBusAssignmentWhereInput[]
    NOT?: RegularBusAssignmentWhereInput | RegularBusAssignmentWhereInput[]
    RegularBusAssignmentID?: StringFilter<"RegularBusAssignment"> | string
    DriverID?: StringFilter<"RegularBusAssignment"> | string
    ConductorID?: StringFilter<"RegularBusAssignment"> | string
    QuotaPolicyID?: StringFilter<"RegularBusAssignment"> | string
    Change?: FloatFilter<"RegularBusAssignment"> | number
    TripRevenue?: FloatFilter<"RegularBusAssignment"> | number
    quotaPolicy?: XOR<Quota_PolicyScalarRelationFilter, Quota_PolicyWhereInput>
    BusAssignment?: XOR<BusAssignmentScalarRelationFilter, BusAssignmentWhereInput>
  }

  export type RegularBusAssignmentOrderByWithRelationInput = {
    RegularBusAssignmentID?: SortOrder
    DriverID?: SortOrder
    ConductorID?: SortOrder
    QuotaPolicyID?: SortOrder
    Change?: SortOrder
    TripRevenue?: SortOrder
    quotaPolicy?: Quota_PolicyOrderByWithRelationInput
    BusAssignment?: BusAssignmentOrderByWithRelationInput
  }

  export type RegularBusAssignmentWhereUniqueInput = Prisma.AtLeast<{
    RegularBusAssignmentID?: string
    AND?: RegularBusAssignmentWhereInput | RegularBusAssignmentWhereInput[]
    OR?: RegularBusAssignmentWhereInput[]
    NOT?: RegularBusAssignmentWhereInput | RegularBusAssignmentWhereInput[]
    DriverID?: StringFilter<"RegularBusAssignment"> | string
    ConductorID?: StringFilter<"RegularBusAssignment"> | string
    QuotaPolicyID?: StringFilter<"RegularBusAssignment"> | string
    Change?: FloatFilter<"RegularBusAssignment"> | number
    TripRevenue?: FloatFilter<"RegularBusAssignment"> | number
    quotaPolicy?: XOR<Quota_PolicyScalarRelationFilter, Quota_PolicyWhereInput>
    BusAssignment?: XOR<BusAssignmentScalarRelationFilter, BusAssignmentWhereInput>
  }, "RegularBusAssignmentID">

  export type RegularBusAssignmentOrderByWithAggregationInput = {
    RegularBusAssignmentID?: SortOrder
    DriverID?: SortOrder
    ConductorID?: SortOrder
    QuotaPolicyID?: SortOrder
    Change?: SortOrder
    TripRevenue?: SortOrder
    _count?: RegularBusAssignmentCountOrderByAggregateInput
    _avg?: RegularBusAssignmentAvgOrderByAggregateInput
    _max?: RegularBusAssignmentMaxOrderByAggregateInput
    _min?: RegularBusAssignmentMinOrderByAggregateInput
    _sum?: RegularBusAssignmentSumOrderByAggregateInput
  }

  export type RegularBusAssignmentScalarWhereWithAggregatesInput = {
    AND?: RegularBusAssignmentScalarWhereWithAggregatesInput | RegularBusAssignmentScalarWhereWithAggregatesInput[]
    OR?: RegularBusAssignmentScalarWhereWithAggregatesInput[]
    NOT?: RegularBusAssignmentScalarWhereWithAggregatesInput | RegularBusAssignmentScalarWhereWithAggregatesInput[]
    RegularBusAssignmentID?: StringWithAggregatesFilter<"RegularBusAssignment"> | string
    DriverID?: StringWithAggregatesFilter<"RegularBusAssignment"> | string
    ConductorID?: StringWithAggregatesFilter<"RegularBusAssignment"> | string
    QuotaPolicyID?: StringWithAggregatesFilter<"RegularBusAssignment"> | string
    Change?: FloatWithAggregatesFilter<"RegularBusAssignment"> | number
    TripRevenue?: FloatWithAggregatesFilter<"RegularBusAssignment"> | number
  }

  export type Quota_PolicyCreateInput = {
    QuotaPolicyID: string
    StartDate: Date | string
    EndDate: Date | string
    Fixed?: FixedCreateNestedOneWithoutQuotaPolicyInput
    Percentage?: PercentageCreateNestedOneWithoutQuotaPolicyInput
    RegularBusAssignments?: RegularBusAssignmentCreateNestedManyWithoutQuotaPolicyInput
  }

  export type Quota_PolicyUncheckedCreateInput = {
    QuotaPolicyID: string
    StartDate: Date | string
    EndDate: Date | string
    Fixed?: FixedUncheckedCreateNestedOneWithoutQuotaPolicyInput
    Percentage?: PercentageUncheckedCreateNestedOneWithoutQuotaPolicyInput
    RegularBusAssignments?: RegularBusAssignmentUncheckedCreateNestedManyWithoutQuotaPolicyInput
  }

  export type Quota_PolicyUpdateInput = {
    QuotaPolicyID?: StringFieldUpdateOperationsInput | string
    StartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    EndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    Fixed?: FixedUpdateOneWithoutQuotaPolicyNestedInput
    Percentage?: PercentageUpdateOneWithoutQuotaPolicyNestedInput
    RegularBusAssignments?: RegularBusAssignmentUpdateManyWithoutQuotaPolicyNestedInput
  }

  export type Quota_PolicyUncheckedUpdateInput = {
    QuotaPolicyID?: StringFieldUpdateOperationsInput | string
    StartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    EndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    Fixed?: FixedUncheckedUpdateOneWithoutQuotaPolicyNestedInput
    Percentage?: PercentageUncheckedUpdateOneWithoutQuotaPolicyNestedInput
    RegularBusAssignments?: RegularBusAssignmentUncheckedUpdateManyWithoutQuotaPolicyNestedInput
  }

  export type Quota_PolicyCreateManyInput = {
    QuotaPolicyID: string
    StartDate: Date | string
    EndDate: Date | string
  }

  export type Quota_PolicyUpdateManyMutationInput = {
    QuotaPolicyID?: StringFieldUpdateOperationsInput | string
    StartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    EndDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Quota_PolicyUncheckedUpdateManyInput = {
    QuotaPolicyID?: StringFieldUpdateOperationsInput | string
    StartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    EndDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FixedCreateInput = {
    Quota: number
    quotaPolicy: Quota_PolicyCreateNestedOneWithoutFixedInput
  }

  export type FixedUncheckedCreateInput = {
    FQuotaPolicyID: string
    Quota: number
  }

  export type FixedUpdateInput = {
    Quota?: FloatFieldUpdateOperationsInput | number
    quotaPolicy?: Quota_PolicyUpdateOneRequiredWithoutFixedNestedInput
  }

  export type FixedUncheckedUpdateInput = {
    FQuotaPolicyID?: StringFieldUpdateOperationsInput | string
    Quota?: FloatFieldUpdateOperationsInput | number
  }

  export type FixedCreateManyInput = {
    FQuotaPolicyID: string
    Quota: number
  }

  export type FixedUpdateManyMutationInput = {
    Quota?: FloatFieldUpdateOperationsInput | number
  }

  export type FixedUncheckedUpdateManyInput = {
    FQuotaPolicyID?: StringFieldUpdateOperationsInput | string
    Quota?: FloatFieldUpdateOperationsInput | number
  }

  export type PercentageCreateInput = {
    Percentage: number
    quotaPolicy: Quota_PolicyCreateNestedOneWithoutPercentageInput
  }

  export type PercentageUncheckedCreateInput = {
    PQuotaPolicyID: string
    Percentage: number
  }

  export type PercentageUpdateInput = {
    Percentage?: FloatFieldUpdateOperationsInput | number
    quotaPolicy?: Quota_PolicyUpdateOneRequiredWithoutPercentageNestedInput
  }

  export type PercentageUncheckedUpdateInput = {
    PQuotaPolicyID?: StringFieldUpdateOperationsInput | string
    Percentage?: FloatFieldUpdateOperationsInput | number
  }

  export type PercentageCreateManyInput = {
    PQuotaPolicyID: string
    Percentage: number
  }

  export type PercentageUpdateManyMutationInput = {
    Percentage?: FloatFieldUpdateOperationsInput | number
  }

  export type PercentageUncheckedUpdateManyInput = {
    PQuotaPolicyID?: StringFieldUpdateOperationsInput | string
    Percentage?: FloatFieldUpdateOperationsInput | number
  }

  export type StopCreateInput = {
    StopID: string
    StopName: string
    latitude: string
    longitude: string
    IsDeleted: boolean
    routesAsStart?: RouteCreateNestedManyWithoutStartStopInput
    routesAsEnd?: RouteCreateNestedManyWithoutEndStopInput
    RouteStops?: RouteStopCreateNestedManyWithoutStopInput
  }

  export type StopUncheckedCreateInput = {
    StopID: string
    StopName: string
    latitude: string
    longitude: string
    IsDeleted: boolean
    routesAsStart?: RouteUncheckedCreateNestedManyWithoutStartStopInput
    routesAsEnd?: RouteUncheckedCreateNestedManyWithoutEndStopInput
    RouteStops?: RouteStopUncheckedCreateNestedManyWithoutStopInput
  }

  export type StopUpdateInput = {
    StopID?: StringFieldUpdateOperationsInput | string
    StopName?: StringFieldUpdateOperationsInput | string
    latitude?: StringFieldUpdateOperationsInput | string
    longitude?: StringFieldUpdateOperationsInput | string
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    routesAsStart?: RouteUpdateManyWithoutStartStopNestedInput
    routesAsEnd?: RouteUpdateManyWithoutEndStopNestedInput
    RouteStops?: RouteStopUpdateManyWithoutStopNestedInput
  }

  export type StopUncheckedUpdateInput = {
    StopID?: StringFieldUpdateOperationsInput | string
    StopName?: StringFieldUpdateOperationsInput | string
    latitude?: StringFieldUpdateOperationsInput | string
    longitude?: StringFieldUpdateOperationsInput | string
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    routesAsStart?: RouteUncheckedUpdateManyWithoutStartStopNestedInput
    routesAsEnd?: RouteUncheckedUpdateManyWithoutEndStopNestedInput
    RouteStops?: RouteStopUncheckedUpdateManyWithoutStopNestedInput
  }

  export type StopCreateManyInput = {
    StopID: string
    StopName: string
    latitude: string
    longitude: string
    IsDeleted: boolean
  }

  export type StopUpdateManyMutationInput = {
    StopID?: StringFieldUpdateOperationsInput | string
    StopName?: StringFieldUpdateOperationsInput | string
    latitude?: StringFieldUpdateOperationsInput | string
    longitude?: StringFieldUpdateOperationsInput | string
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StopUncheckedUpdateManyInput = {
    StopID?: StringFieldUpdateOperationsInput | string
    StopName?: StringFieldUpdateOperationsInput | string
    latitude?: StringFieldUpdateOperationsInput | string
    longitude?: StringFieldUpdateOperationsInput | string
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RouteCreateInput = {
    RouteID: string
    RouteName: string
    IsDeleted: boolean
    StartStop: StopCreateNestedOneWithoutRoutesAsStartInput
    EndStop: StopCreateNestedOneWithoutRoutesAsEndInput
    RouteStops?: RouteStopCreateNestedManyWithoutRouteInput
    BusAssignments?: BusAssignmentCreateNestedManyWithoutRouteInput
  }

  export type RouteUncheckedCreateInput = {
    RouteID: string
    StartStopID: string
    EndStopID: string
    RouteName: string
    IsDeleted: boolean
    RouteStops?: RouteStopUncheckedCreateNestedManyWithoutRouteInput
    BusAssignments?: BusAssignmentUncheckedCreateNestedManyWithoutRouteInput
  }

  export type RouteUpdateInput = {
    RouteID?: StringFieldUpdateOperationsInput | string
    RouteName?: StringFieldUpdateOperationsInput | string
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    StartStop?: StopUpdateOneRequiredWithoutRoutesAsStartNestedInput
    EndStop?: StopUpdateOneRequiredWithoutRoutesAsEndNestedInput
    RouteStops?: RouteStopUpdateManyWithoutRouteNestedInput
    BusAssignments?: BusAssignmentUpdateManyWithoutRouteNestedInput
  }

  export type RouteUncheckedUpdateInput = {
    RouteID?: StringFieldUpdateOperationsInput | string
    StartStopID?: StringFieldUpdateOperationsInput | string
    EndStopID?: StringFieldUpdateOperationsInput | string
    RouteName?: StringFieldUpdateOperationsInput | string
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    RouteStops?: RouteStopUncheckedUpdateManyWithoutRouteNestedInput
    BusAssignments?: BusAssignmentUncheckedUpdateManyWithoutRouteNestedInput
  }

  export type RouteCreateManyInput = {
    RouteID: string
    StartStopID: string
    EndStopID: string
    RouteName: string
    IsDeleted: boolean
  }

  export type RouteUpdateManyMutationInput = {
    RouteID?: StringFieldUpdateOperationsInput | string
    RouteName?: StringFieldUpdateOperationsInput | string
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RouteUncheckedUpdateManyInput = {
    RouteID?: StringFieldUpdateOperationsInput | string
    StartStopID?: StringFieldUpdateOperationsInput | string
    EndStopID?: StringFieldUpdateOperationsInput | string
    RouteName?: StringFieldUpdateOperationsInput | string
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RouteStopCreateInput = {
    RouteStopID: string
    StopOrder: number
    Route: RouteCreateNestedOneWithoutRouteStopsInput
    Stop: StopCreateNestedOneWithoutRouteStopsInput
  }

  export type RouteStopUncheckedCreateInput = {
    RouteStopID: string
    RouteID: string
    StopID: string
    StopOrder: number
  }

  export type RouteStopUpdateInput = {
    RouteStopID?: StringFieldUpdateOperationsInput | string
    StopOrder?: IntFieldUpdateOperationsInput | number
    Route?: RouteUpdateOneRequiredWithoutRouteStopsNestedInput
    Stop?: StopUpdateOneRequiredWithoutRouteStopsNestedInput
  }

  export type RouteStopUncheckedUpdateInput = {
    RouteStopID?: StringFieldUpdateOperationsInput | string
    RouteID?: StringFieldUpdateOperationsInput | string
    StopID?: StringFieldUpdateOperationsInput | string
    StopOrder?: IntFieldUpdateOperationsInput | number
  }

  export type RouteStopCreateManyInput = {
    RouteStopID: string
    RouteID: string
    StopID: string
    StopOrder: number
  }

  export type RouteStopUpdateManyMutationInput = {
    RouteStopID?: StringFieldUpdateOperationsInput | string
    StopOrder?: IntFieldUpdateOperationsInput | number
  }

  export type RouteStopUncheckedUpdateManyInput = {
    RouteStopID?: StringFieldUpdateOperationsInput | string
    RouteID?: StringFieldUpdateOperationsInput | string
    StopID?: StringFieldUpdateOperationsInput | string
    StopOrder?: IntFieldUpdateOperationsInput | number
  }

  export type BusAssignmentCreateInput = {
    BusAssignmentID: string
    BusID: string
    AssignmentDate: Date | string
    Battery?: boolean
    Lights?: boolean
    Oil?: boolean
    Water?: boolean
    Break?: boolean
    Air?: boolean
    Gas?: boolean
    Engine?: boolean
    TireCondition?: boolean
    Self_Driver?: boolean
    Self_Conductor?: boolean
    IsDeleted?: boolean
    Status?: $Enums.BusOperationStatus
    Route: RouteCreateNestedOneWithoutBusAssignmentsInput
    RegularBusAssignment?: RegularBusAssignmentCreateNestedOneWithoutBusAssignmentInput
  }

  export type BusAssignmentUncheckedCreateInput = {
    BusAssignmentID: string
    BusID: string
    RouteID: string
    AssignmentDate: Date | string
    Battery?: boolean
    Lights?: boolean
    Oil?: boolean
    Water?: boolean
    Break?: boolean
    Air?: boolean
    Gas?: boolean
    Engine?: boolean
    TireCondition?: boolean
    Self_Driver?: boolean
    Self_Conductor?: boolean
    IsDeleted?: boolean
    Status?: $Enums.BusOperationStatus
    RegularBusAssignment?: RegularBusAssignmentUncheckedCreateNestedOneWithoutBusAssignmentInput
  }

  export type BusAssignmentUpdateInput = {
    BusAssignmentID?: StringFieldUpdateOperationsInput | string
    BusID?: StringFieldUpdateOperationsInput | string
    AssignmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    Battery?: BoolFieldUpdateOperationsInput | boolean
    Lights?: BoolFieldUpdateOperationsInput | boolean
    Oil?: BoolFieldUpdateOperationsInput | boolean
    Water?: BoolFieldUpdateOperationsInput | boolean
    Break?: BoolFieldUpdateOperationsInput | boolean
    Air?: BoolFieldUpdateOperationsInput | boolean
    Gas?: BoolFieldUpdateOperationsInput | boolean
    Engine?: BoolFieldUpdateOperationsInput | boolean
    TireCondition?: BoolFieldUpdateOperationsInput | boolean
    Self_Driver?: BoolFieldUpdateOperationsInput | boolean
    Self_Conductor?: BoolFieldUpdateOperationsInput | boolean
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    Status?: EnumBusOperationStatusFieldUpdateOperationsInput | $Enums.BusOperationStatus
    Route?: RouteUpdateOneRequiredWithoutBusAssignmentsNestedInput
    RegularBusAssignment?: RegularBusAssignmentUpdateOneWithoutBusAssignmentNestedInput
  }

  export type BusAssignmentUncheckedUpdateInput = {
    BusAssignmentID?: StringFieldUpdateOperationsInput | string
    BusID?: StringFieldUpdateOperationsInput | string
    RouteID?: StringFieldUpdateOperationsInput | string
    AssignmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    Battery?: BoolFieldUpdateOperationsInput | boolean
    Lights?: BoolFieldUpdateOperationsInput | boolean
    Oil?: BoolFieldUpdateOperationsInput | boolean
    Water?: BoolFieldUpdateOperationsInput | boolean
    Break?: BoolFieldUpdateOperationsInput | boolean
    Air?: BoolFieldUpdateOperationsInput | boolean
    Gas?: BoolFieldUpdateOperationsInput | boolean
    Engine?: BoolFieldUpdateOperationsInput | boolean
    TireCondition?: BoolFieldUpdateOperationsInput | boolean
    Self_Driver?: BoolFieldUpdateOperationsInput | boolean
    Self_Conductor?: BoolFieldUpdateOperationsInput | boolean
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    Status?: EnumBusOperationStatusFieldUpdateOperationsInput | $Enums.BusOperationStatus
    RegularBusAssignment?: RegularBusAssignmentUncheckedUpdateOneWithoutBusAssignmentNestedInput
  }

  export type BusAssignmentCreateManyInput = {
    BusAssignmentID: string
    BusID: string
    RouteID: string
    AssignmentDate: Date | string
    Battery?: boolean
    Lights?: boolean
    Oil?: boolean
    Water?: boolean
    Break?: boolean
    Air?: boolean
    Gas?: boolean
    Engine?: boolean
    TireCondition?: boolean
    Self_Driver?: boolean
    Self_Conductor?: boolean
    IsDeleted?: boolean
    Status?: $Enums.BusOperationStatus
  }

  export type BusAssignmentUpdateManyMutationInput = {
    BusAssignmentID?: StringFieldUpdateOperationsInput | string
    BusID?: StringFieldUpdateOperationsInput | string
    AssignmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    Battery?: BoolFieldUpdateOperationsInput | boolean
    Lights?: BoolFieldUpdateOperationsInput | boolean
    Oil?: BoolFieldUpdateOperationsInput | boolean
    Water?: BoolFieldUpdateOperationsInput | boolean
    Break?: BoolFieldUpdateOperationsInput | boolean
    Air?: BoolFieldUpdateOperationsInput | boolean
    Gas?: BoolFieldUpdateOperationsInput | boolean
    Engine?: BoolFieldUpdateOperationsInput | boolean
    TireCondition?: BoolFieldUpdateOperationsInput | boolean
    Self_Driver?: BoolFieldUpdateOperationsInput | boolean
    Self_Conductor?: BoolFieldUpdateOperationsInput | boolean
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    Status?: EnumBusOperationStatusFieldUpdateOperationsInput | $Enums.BusOperationStatus
  }

  export type BusAssignmentUncheckedUpdateManyInput = {
    BusAssignmentID?: StringFieldUpdateOperationsInput | string
    BusID?: StringFieldUpdateOperationsInput | string
    RouteID?: StringFieldUpdateOperationsInput | string
    AssignmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    Battery?: BoolFieldUpdateOperationsInput | boolean
    Lights?: BoolFieldUpdateOperationsInput | boolean
    Oil?: BoolFieldUpdateOperationsInput | boolean
    Water?: BoolFieldUpdateOperationsInput | boolean
    Break?: BoolFieldUpdateOperationsInput | boolean
    Air?: BoolFieldUpdateOperationsInput | boolean
    Gas?: BoolFieldUpdateOperationsInput | boolean
    Engine?: BoolFieldUpdateOperationsInput | boolean
    TireCondition?: BoolFieldUpdateOperationsInput | boolean
    Self_Driver?: BoolFieldUpdateOperationsInput | boolean
    Self_Conductor?: BoolFieldUpdateOperationsInput | boolean
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    Status?: EnumBusOperationStatusFieldUpdateOperationsInput | $Enums.BusOperationStatus
  }

  export type RegularBusAssignmentCreateInput = {
    DriverID: string
    ConductorID: string
    Change: number
    TripRevenue: number
    quotaPolicy: Quota_PolicyCreateNestedOneWithoutRegularBusAssignmentsInput
    BusAssignment: BusAssignmentCreateNestedOneWithoutRegularBusAssignmentInput
  }

  export type RegularBusAssignmentUncheckedCreateInput = {
    RegularBusAssignmentID: string
    DriverID: string
    ConductorID: string
    QuotaPolicyID: string
    Change: number
    TripRevenue: number
  }

  export type RegularBusAssignmentUpdateInput = {
    DriverID?: StringFieldUpdateOperationsInput | string
    ConductorID?: StringFieldUpdateOperationsInput | string
    Change?: FloatFieldUpdateOperationsInput | number
    TripRevenue?: FloatFieldUpdateOperationsInput | number
    quotaPolicy?: Quota_PolicyUpdateOneRequiredWithoutRegularBusAssignmentsNestedInput
    BusAssignment?: BusAssignmentUpdateOneRequiredWithoutRegularBusAssignmentNestedInput
  }

  export type RegularBusAssignmentUncheckedUpdateInput = {
    RegularBusAssignmentID?: StringFieldUpdateOperationsInput | string
    DriverID?: StringFieldUpdateOperationsInput | string
    ConductorID?: StringFieldUpdateOperationsInput | string
    QuotaPolicyID?: StringFieldUpdateOperationsInput | string
    Change?: FloatFieldUpdateOperationsInput | number
    TripRevenue?: FloatFieldUpdateOperationsInput | number
  }

  export type RegularBusAssignmentCreateManyInput = {
    RegularBusAssignmentID: string
    DriverID: string
    ConductorID: string
    QuotaPolicyID: string
    Change: number
    TripRevenue: number
  }

  export type RegularBusAssignmentUpdateManyMutationInput = {
    DriverID?: StringFieldUpdateOperationsInput | string
    ConductorID?: StringFieldUpdateOperationsInput | string
    Change?: FloatFieldUpdateOperationsInput | number
    TripRevenue?: FloatFieldUpdateOperationsInput | number
  }

  export type RegularBusAssignmentUncheckedUpdateManyInput = {
    RegularBusAssignmentID?: StringFieldUpdateOperationsInput | string
    DriverID?: StringFieldUpdateOperationsInput | string
    ConductorID?: StringFieldUpdateOperationsInput | string
    QuotaPolicyID?: StringFieldUpdateOperationsInput | string
    Change?: FloatFieldUpdateOperationsInput | number
    TripRevenue?: FloatFieldUpdateOperationsInput | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FixedNullableScalarRelationFilter = {
    is?: FixedWhereInput | null
    isNot?: FixedWhereInput | null
  }

  export type PercentageNullableScalarRelationFilter = {
    is?: PercentageWhereInput | null
    isNot?: PercentageWhereInput | null
  }

  export type RegularBusAssignmentListRelationFilter = {
    every?: RegularBusAssignmentWhereInput
    some?: RegularBusAssignmentWhereInput
    none?: RegularBusAssignmentWhereInput
  }

  export type RegularBusAssignmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type Quota_PolicyCountOrderByAggregateInput = {
    QuotaPolicyID?: SortOrder
    StartDate?: SortOrder
    EndDate?: SortOrder
  }

  export type Quota_PolicyMaxOrderByAggregateInput = {
    QuotaPolicyID?: SortOrder
    StartDate?: SortOrder
    EndDate?: SortOrder
  }

  export type Quota_PolicyMinOrderByAggregateInput = {
    QuotaPolicyID?: SortOrder
    StartDate?: SortOrder
    EndDate?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type Quota_PolicyScalarRelationFilter = {
    is?: Quota_PolicyWhereInput
    isNot?: Quota_PolicyWhereInput
  }

  export type FixedCountOrderByAggregateInput = {
    FQuotaPolicyID?: SortOrder
    Quota?: SortOrder
  }

  export type FixedAvgOrderByAggregateInput = {
    Quota?: SortOrder
  }

  export type FixedMaxOrderByAggregateInput = {
    FQuotaPolicyID?: SortOrder
    Quota?: SortOrder
  }

  export type FixedMinOrderByAggregateInput = {
    FQuotaPolicyID?: SortOrder
    Quota?: SortOrder
  }

  export type FixedSumOrderByAggregateInput = {
    Quota?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type PercentageCountOrderByAggregateInput = {
    PQuotaPolicyID?: SortOrder
    Percentage?: SortOrder
  }

  export type PercentageAvgOrderByAggregateInput = {
    Percentage?: SortOrder
  }

  export type PercentageMaxOrderByAggregateInput = {
    PQuotaPolicyID?: SortOrder
    Percentage?: SortOrder
  }

  export type PercentageMinOrderByAggregateInput = {
    PQuotaPolicyID?: SortOrder
    Percentage?: SortOrder
  }

  export type PercentageSumOrderByAggregateInput = {
    Percentage?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type RouteListRelationFilter = {
    every?: RouteWhereInput
    some?: RouteWhereInput
    none?: RouteWhereInput
  }

  export type RouteStopListRelationFilter = {
    every?: RouteStopWhereInput
    some?: RouteStopWhereInput
    none?: RouteStopWhereInput
  }

  export type RouteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RouteStopOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StopCountOrderByAggregateInput = {
    StopID?: SortOrder
    StopName?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    IsDeleted?: SortOrder
  }

  export type StopMaxOrderByAggregateInput = {
    StopID?: SortOrder
    StopName?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    IsDeleted?: SortOrder
  }

  export type StopMinOrderByAggregateInput = {
    StopID?: SortOrder
    StopName?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    IsDeleted?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StopScalarRelationFilter = {
    is?: StopWhereInput
    isNot?: StopWhereInput
  }

  export type BusAssignmentListRelationFilter = {
    every?: BusAssignmentWhereInput
    some?: BusAssignmentWhereInput
    none?: BusAssignmentWhereInput
  }

  export type BusAssignmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RouteCountOrderByAggregateInput = {
    RouteID?: SortOrder
    StartStopID?: SortOrder
    EndStopID?: SortOrder
    RouteName?: SortOrder
    IsDeleted?: SortOrder
  }

  export type RouteMaxOrderByAggregateInput = {
    RouteID?: SortOrder
    StartStopID?: SortOrder
    EndStopID?: SortOrder
    RouteName?: SortOrder
    IsDeleted?: SortOrder
  }

  export type RouteMinOrderByAggregateInput = {
    RouteID?: SortOrder
    StartStopID?: SortOrder
    EndStopID?: SortOrder
    RouteName?: SortOrder
    IsDeleted?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type RouteScalarRelationFilter = {
    is?: RouteWhereInput
    isNot?: RouteWhereInput
  }

  export type RouteStopRouteIDStopIDCompoundUniqueInput = {
    RouteID: string
    StopID: string
  }

  export type RouteStopCountOrderByAggregateInput = {
    RouteStopID?: SortOrder
    RouteID?: SortOrder
    StopID?: SortOrder
    StopOrder?: SortOrder
  }

  export type RouteStopAvgOrderByAggregateInput = {
    StopOrder?: SortOrder
  }

  export type RouteStopMaxOrderByAggregateInput = {
    RouteStopID?: SortOrder
    RouteID?: SortOrder
    StopID?: SortOrder
    StopOrder?: SortOrder
  }

  export type RouteStopMinOrderByAggregateInput = {
    RouteStopID?: SortOrder
    RouteID?: SortOrder
    StopID?: SortOrder
    StopOrder?: SortOrder
  }

  export type RouteStopSumOrderByAggregateInput = {
    StopOrder?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumBusOperationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BusOperationStatus | EnumBusOperationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BusOperationStatus[] | ListEnumBusOperationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusOperationStatus[] | ListEnumBusOperationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBusOperationStatusFilter<$PrismaModel> | $Enums.BusOperationStatus
  }

  export type RegularBusAssignmentNullableScalarRelationFilter = {
    is?: RegularBusAssignmentWhereInput | null
    isNot?: RegularBusAssignmentWhereInput | null
  }

  export type BusAssignmentCountOrderByAggregateInput = {
    BusAssignmentID?: SortOrder
    BusID?: SortOrder
    RouteID?: SortOrder
    AssignmentDate?: SortOrder
    Battery?: SortOrder
    Lights?: SortOrder
    Oil?: SortOrder
    Water?: SortOrder
    Break?: SortOrder
    Air?: SortOrder
    Gas?: SortOrder
    Engine?: SortOrder
    TireCondition?: SortOrder
    Self_Driver?: SortOrder
    Self_Conductor?: SortOrder
    IsDeleted?: SortOrder
    Status?: SortOrder
  }

  export type BusAssignmentMaxOrderByAggregateInput = {
    BusAssignmentID?: SortOrder
    BusID?: SortOrder
    RouteID?: SortOrder
    AssignmentDate?: SortOrder
    Battery?: SortOrder
    Lights?: SortOrder
    Oil?: SortOrder
    Water?: SortOrder
    Break?: SortOrder
    Air?: SortOrder
    Gas?: SortOrder
    Engine?: SortOrder
    TireCondition?: SortOrder
    Self_Driver?: SortOrder
    Self_Conductor?: SortOrder
    IsDeleted?: SortOrder
    Status?: SortOrder
  }

  export type BusAssignmentMinOrderByAggregateInput = {
    BusAssignmentID?: SortOrder
    BusID?: SortOrder
    RouteID?: SortOrder
    AssignmentDate?: SortOrder
    Battery?: SortOrder
    Lights?: SortOrder
    Oil?: SortOrder
    Water?: SortOrder
    Break?: SortOrder
    Air?: SortOrder
    Gas?: SortOrder
    Engine?: SortOrder
    TireCondition?: SortOrder
    Self_Driver?: SortOrder
    Self_Conductor?: SortOrder
    IsDeleted?: SortOrder
    Status?: SortOrder
  }

  export type EnumBusOperationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BusOperationStatus | EnumBusOperationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BusOperationStatus[] | ListEnumBusOperationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusOperationStatus[] | ListEnumBusOperationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBusOperationStatusWithAggregatesFilter<$PrismaModel> | $Enums.BusOperationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBusOperationStatusFilter<$PrismaModel>
    _max?: NestedEnumBusOperationStatusFilter<$PrismaModel>
  }

  export type BusAssignmentScalarRelationFilter = {
    is?: BusAssignmentWhereInput
    isNot?: BusAssignmentWhereInput
  }

  export type RegularBusAssignmentCountOrderByAggregateInput = {
    RegularBusAssignmentID?: SortOrder
    DriverID?: SortOrder
    ConductorID?: SortOrder
    QuotaPolicyID?: SortOrder
    Change?: SortOrder
    TripRevenue?: SortOrder
  }

  export type RegularBusAssignmentAvgOrderByAggregateInput = {
    Change?: SortOrder
    TripRevenue?: SortOrder
  }

  export type RegularBusAssignmentMaxOrderByAggregateInput = {
    RegularBusAssignmentID?: SortOrder
    DriverID?: SortOrder
    ConductorID?: SortOrder
    QuotaPolicyID?: SortOrder
    Change?: SortOrder
    TripRevenue?: SortOrder
  }

  export type RegularBusAssignmentMinOrderByAggregateInput = {
    RegularBusAssignmentID?: SortOrder
    DriverID?: SortOrder
    ConductorID?: SortOrder
    QuotaPolicyID?: SortOrder
    Change?: SortOrder
    TripRevenue?: SortOrder
  }

  export type RegularBusAssignmentSumOrderByAggregateInput = {
    Change?: SortOrder
    TripRevenue?: SortOrder
  }

  export type FixedCreateNestedOneWithoutQuotaPolicyInput = {
    create?: XOR<FixedCreateWithoutQuotaPolicyInput, FixedUncheckedCreateWithoutQuotaPolicyInput>
    connectOrCreate?: FixedCreateOrConnectWithoutQuotaPolicyInput
    connect?: FixedWhereUniqueInput
  }

  export type PercentageCreateNestedOneWithoutQuotaPolicyInput = {
    create?: XOR<PercentageCreateWithoutQuotaPolicyInput, PercentageUncheckedCreateWithoutQuotaPolicyInput>
    connectOrCreate?: PercentageCreateOrConnectWithoutQuotaPolicyInput
    connect?: PercentageWhereUniqueInput
  }

  export type RegularBusAssignmentCreateNestedManyWithoutQuotaPolicyInput = {
    create?: XOR<RegularBusAssignmentCreateWithoutQuotaPolicyInput, RegularBusAssignmentUncheckedCreateWithoutQuotaPolicyInput> | RegularBusAssignmentCreateWithoutQuotaPolicyInput[] | RegularBusAssignmentUncheckedCreateWithoutQuotaPolicyInput[]
    connectOrCreate?: RegularBusAssignmentCreateOrConnectWithoutQuotaPolicyInput | RegularBusAssignmentCreateOrConnectWithoutQuotaPolicyInput[]
    createMany?: RegularBusAssignmentCreateManyQuotaPolicyInputEnvelope
    connect?: RegularBusAssignmentWhereUniqueInput | RegularBusAssignmentWhereUniqueInput[]
  }

  export type FixedUncheckedCreateNestedOneWithoutQuotaPolicyInput = {
    create?: XOR<FixedCreateWithoutQuotaPolicyInput, FixedUncheckedCreateWithoutQuotaPolicyInput>
    connectOrCreate?: FixedCreateOrConnectWithoutQuotaPolicyInput
    connect?: FixedWhereUniqueInput
  }

  export type PercentageUncheckedCreateNestedOneWithoutQuotaPolicyInput = {
    create?: XOR<PercentageCreateWithoutQuotaPolicyInput, PercentageUncheckedCreateWithoutQuotaPolicyInput>
    connectOrCreate?: PercentageCreateOrConnectWithoutQuotaPolicyInput
    connect?: PercentageWhereUniqueInput
  }

  export type RegularBusAssignmentUncheckedCreateNestedManyWithoutQuotaPolicyInput = {
    create?: XOR<RegularBusAssignmentCreateWithoutQuotaPolicyInput, RegularBusAssignmentUncheckedCreateWithoutQuotaPolicyInput> | RegularBusAssignmentCreateWithoutQuotaPolicyInput[] | RegularBusAssignmentUncheckedCreateWithoutQuotaPolicyInput[]
    connectOrCreate?: RegularBusAssignmentCreateOrConnectWithoutQuotaPolicyInput | RegularBusAssignmentCreateOrConnectWithoutQuotaPolicyInput[]
    createMany?: RegularBusAssignmentCreateManyQuotaPolicyInputEnvelope
    connect?: RegularBusAssignmentWhereUniqueInput | RegularBusAssignmentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FixedUpdateOneWithoutQuotaPolicyNestedInput = {
    create?: XOR<FixedCreateWithoutQuotaPolicyInput, FixedUncheckedCreateWithoutQuotaPolicyInput>
    connectOrCreate?: FixedCreateOrConnectWithoutQuotaPolicyInput
    upsert?: FixedUpsertWithoutQuotaPolicyInput
    disconnect?: FixedWhereInput | boolean
    delete?: FixedWhereInput | boolean
    connect?: FixedWhereUniqueInput
    update?: XOR<XOR<FixedUpdateToOneWithWhereWithoutQuotaPolicyInput, FixedUpdateWithoutQuotaPolicyInput>, FixedUncheckedUpdateWithoutQuotaPolicyInput>
  }

  export type PercentageUpdateOneWithoutQuotaPolicyNestedInput = {
    create?: XOR<PercentageCreateWithoutQuotaPolicyInput, PercentageUncheckedCreateWithoutQuotaPolicyInput>
    connectOrCreate?: PercentageCreateOrConnectWithoutQuotaPolicyInput
    upsert?: PercentageUpsertWithoutQuotaPolicyInput
    disconnect?: PercentageWhereInput | boolean
    delete?: PercentageWhereInput | boolean
    connect?: PercentageWhereUniqueInput
    update?: XOR<XOR<PercentageUpdateToOneWithWhereWithoutQuotaPolicyInput, PercentageUpdateWithoutQuotaPolicyInput>, PercentageUncheckedUpdateWithoutQuotaPolicyInput>
  }

  export type RegularBusAssignmentUpdateManyWithoutQuotaPolicyNestedInput = {
    create?: XOR<RegularBusAssignmentCreateWithoutQuotaPolicyInput, RegularBusAssignmentUncheckedCreateWithoutQuotaPolicyInput> | RegularBusAssignmentCreateWithoutQuotaPolicyInput[] | RegularBusAssignmentUncheckedCreateWithoutQuotaPolicyInput[]
    connectOrCreate?: RegularBusAssignmentCreateOrConnectWithoutQuotaPolicyInput | RegularBusAssignmentCreateOrConnectWithoutQuotaPolicyInput[]
    upsert?: RegularBusAssignmentUpsertWithWhereUniqueWithoutQuotaPolicyInput | RegularBusAssignmentUpsertWithWhereUniqueWithoutQuotaPolicyInput[]
    createMany?: RegularBusAssignmentCreateManyQuotaPolicyInputEnvelope
    set?: RegularBusAssignmentWhereUniqueInput | RegularBusAssignmentWhereUniqueInput[]
    disconnect?: RegularBusAssignmentWhereUniqueInput | RegularBusAssignmentWhereUniqueInput[]
    delete?: RegularBusAssignmentWhereUniqueInput | RegularBusAssignmentWhereUniqueInput[]
    connect?: RegularBusAssignmentWhereUniqueInput | RegularBusAssignmentWhereUniqueInput[]
    update?: RegularBusAssignmentUpdateWithWhereUniqueWithoutQuotaPolicyInput | RegularBusAssignmentUpdateWithWhereUniqueWithoutQuotaPolicyInput[]
    updateMany?: RegularBusAssignmentUpdateManyWithWhereWithoutQuotaPolicyInput | RegularBusAssignmentUpdateManyWithWhereWithoutQuotaPolicyInput[]
    deleteMany?: RegularBusAssignmentScalarWhereInput | RegularBusAssignmentScalarWhereInput[]
  }

  export type FixedUncheckedUpdateOneWithoutQuotaPolicyNestedInput = {
    create?: XOR<FixedCreateWithoutQuotaPolicyInput, FixedUncheckedCreateWithoutQuotaPolicyInput>
    connectOrCreate?: FixedCreateOrConnectWithoutQuotaPolicyInput
    upsert?: FixedUpsertWithoutQuotaPolicyInput
    disconnect?: FixedWhereInput | boolean
    delete?: FixedWhereInput | boolean
    connect?: FixedWhereUniqueInput
    update?: XOR<XOR<FixedUpdateToOneWithWhereWithoutQuotaPolicyInput, FixedUpdateWithoutQuotaPolicyInput>, FixedUncheckedUpdateWithoutQuotaPolicyInput>
  }

  export type PercentageUncheckedUpdateOneWithoutQuotaPolicyNestedInput = {
    create?: XOR<PercentageCreateWithoutQuotaPolicyInput, PercentageUncheckedCreateWithoutQuotaPolicyInput>
    connectOrCreate?: PercentageCreateOrConnectWithoutQuotaPolicyInput
    upsert?: PercentageUpsertWithoutQuotaPolicyInput
    disconnect?: PercentageWhereInput | boolean
    delete?: PercentageWhereInput | boolean
    connect?: PercentageWhereUniqueInput
    update?: XOR<XOR<PercentageUpdateToOneWithWhereWithoutQuotaPolicyInput, PercentageUpdateWithoutQuotaPolicyInput>, PercentageUncheckedUpdateWithoutQuotaPolicyInput>
  }

  export type RegularBusAssignmentUncheckedUpdateManyWithoutQuotaPolicyNestedInput = {
    create?: XOR<RegularBusAssignmentCreateWithoutQuotaPolicyInput, RegularBusAssignmentUncheckedCreateWithoutQuotaPolicyInput> | RegularBusAssignmentCreateWithoutQuotaPolicyInput[] | RegularBusAssignmentUncheckedCreateWithoutQuotaPolicyInput[]
    connectOrCreate?: RegularBusAssignmentCreateOrConnectWithoutQuotaPolicyInput | RegularBusAssignmentCreateOrConnectWithoutQuotaPolicyInput[]
    upsert?: RegularBusAssignmentUpsertWithWhereUniqueWithoutQuotaPolicyInput | RegularBusAssignmentUpsertWithWhereUniqueWithoutQuotaPolicyInput[]
    createMany?: RegularBusAssignmentCreateManyQuotaPolicyInputEnvelope
    set?: RegularBusAssignmentWhereUniqueInput | RegularBusAssignmentWhereUniqueInput[]
    disconnect?: RegularBusAssignmentWhereUniqueInput | RegularBusAssignmentWhereUniqueInput[]
    delete?: RegularBusAssignmentWhereUniqueInput | RegularBusAssignmentWhereUniqueInput[]
    connect?: RegularBusAssignmentWhereUniqueInput | RegularBusAssignmentWhereUniqueInput[]
    update?: RegularBusAssignmentUpdateWithWhereUniqueWithoutQuotaPolicyInput | RegularBusAssignmentUpdateWithWhereUniqueWithoutQuotaPolicyInput[]
    updateMany?: RegularBusAssignmentUpdateManyWithWhereWithoutQuotaPolicyInput | RegularBusAssignmentUpdateManyWithWhereWithoutQuotaPolicyInput[]
    deleteMany?: RegularBusAssignmentScalarWhereInput | RegularBusAssignmentScalarWhereInput[]
  }

  export type Quota_PolicyCreateNestedOneWithoutFixedInput = {
    create?: XOR<Quota_PolicyCreateWithoutFixedInput, Quota_PolicyUncheckedCreateWithoutFixedInput>
    connectOrCreate?: Quota_PolicyCreateOrConnectWithoutFixedInput
    connect?: Quota_PolicyWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type Quota_PolicyUpdateOneRequiredWithoutFixedNestedInput = {
    create?: XOR<Quota_PolicyCreateWithoutFixedInput, Quota_PolicyUncheckedCreateWithoutFixedInput>
    connectOrCreate?: Quota_PolicyCreateOrConnectWithoutFixedInput
    upsert?: Quota_PolicyUpsertWithoutFixedInput
    connect?: Quota_PolicyWhereUniqueInput
    update?: XOR<XOR<Quota_PolicyUpdateToOneWithWhereWithoutFixedInput, Quota_PolicyUpdateWithoutFixedInput>, Quota_PolicyUncheckedUpdateWithoutFixedInput>
  }

  export type Quota_PolicyCreateNestedOneWithoutPercentageInput = {
    create?: XOR<Quota_PolicyCreateWithoutPercentageInput, Quota_PolicyUncheckedCreateWithoutPercentageInput>
    connectOrCreate?: Quota_PolicyCreateOrConnectWithoutPercentageInput
    connect?: Quota_PolicyWhereUniqueInput
  }

  export type Quota_PolicyUpdateOneRequiredWithoutPercentageNestedInput = {
    create?: XOR<Quota_PolicyCreateWithoutPercentageInput, Quota_PolicyUncheckedCreateWithoutPercentageInput>
    connectOrCreate?: Quota_PolicyCreateOrConnectWithoutPercentageInput
    upsert?: Quota_PolicyUpsertWithoutPercentageInput
    connect?: Quota_PolicyWhereUniqueInput
    update?: XOR<XOR<Quota_PolicyUpdateToOneWithWhereWithoutPercentageInput, Quota_PolicyUpdateWithoutPercentageInput>, Quota_PolicyUncheckedUpdateWithoutPercentageInput>
  }

  export type RouteCreateNestedManyWithoutStartStopInput = {
    create?: XOR<RouteCreateWithoutStartStopInput, RouteUncheckedCreateWithoutStartStopInput> | RouteCreateWithoutStartStopInput[] | RouteUncheckedCreateWithoutStartStopInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutStartStopInput | RouteCreateOrConnectWithoutStartStopInput[]
    createMany?: RouteCreateManyStartStopInputEnvelope
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
  }

  export type RouteCreateNestedManyWithoutEndStopInput = {
    create?: XOR<RouteCreateWithoutEndStopInput, RouteUncheckedCreateWithoutEndStopInput> | RouteCreateWithoutEndStopInput[] | RouteUncheckedCreateWithoutEndStopInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutEndStopInput | RouteCreateOrConnectWithoutEndStopInput[]
    createMany?: RouteCreateManyEndStopInputEnvelope
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
  }

  export type RouteStopCreateNestedManyWithoutStopInput = {
    create?: XOR<RouteStopCreateWithoutStopInput, RouteStopUncheckedCreateWithoutStopInput> | RouteStopCreateWithoutStopInput[] | RouteStopUncheckedCreateWithoutStopInput[]
    connectOrCreate?: RouteStopCreateOrConnectWithoutStopInput | RouteStopCreateOrConnectWithoutStopInput[]
    createMany?: RouteStopCreateManyStopInputEnvelope
    connect?: RouteStopWhereUniqueInput | RouteStopWhereUniqueInput[]
  }

  export type RouteUncheckedCreateNestedManyWithoutStartStopInput = {
    create?: XOR<RouteCreateWithoutStartStopInput, RouteUncheckedCreateWithoutStartStopInput> | RouteCreateWithoutStartStopInput[] | RouteUncheckedCreateWithoutStartStopInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutStartStopInput | RouteCreateOrConnectWithoutStartStopInput[]
    createMany?: RouteCreateManyStartStopInputEnvelope
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
  }

  export type RouteUncheckedCreateNestedManyWithoutEndStopInput = {
    create?: XOR<RouteCreateWithoutEndStopInput, RouteUncheckedCreateWithoutEndStopInput> | RouteCreateWithoutEndStopInput[] | RouteUncheckedCreateWithoutEndStopInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutEndStopInput | RouteCreateOrConnectWithoutEndStopInput[]
    createMany?: RouteCreateManyEndStopInputEnvelope
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
  }

  export type RouteStopUncheckedCreateNestedManyWithoutStopInput = {
    create?: XOR<RouteStopCreateWithoutStopInput, RouteStopUncheckedCreateWithoutStopInput> | RouteStopCreateWithoutStopInput[] | RouteStopUncheckedCreateWithoutStopInput[]
    connectOrCreate?: RouteStopCreateOrConnectWithoutStopInput | RouteStopCreateOrConnectWithoutStopInput[]
    createMany?: RouteStopCreateManyStopInputEnvelope
    connect?: RouteStopWhereUniqueInput | RouteStopWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type RouteUpdateManyWithoutStartStopNestedInput = {
    create?: XOR<RouteCreateWithoutStartStopInput, RouteUncheckedCreateWithoutStartStopInput> | RouteCreateWithoutStartStopInput[] | RouteUncheckedCreateWithoutStartStopInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutStartStopInput | RouteCreateOrConnectWithoutStartStopInput[]
    upsert?: RouteUpsertWithWhereUniqueWithoutStartStopInput | RouteUpsertWithWhereUniqueWithoutStartStopInput[]
    createMany?: RouteCreateManyStartStopInputEnvelope
    set?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    disconnect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    delete?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    update?: RouteUpdateWithWhereUniqueWithoutStartStopInput | RouteUpdateWithWhereUniqueWithoutStartStopInput[]
    updateMany?: RouteUpdateManyWithWhereWithoutStartStopInput | RouteUpdateManyWithWhereWithoutStartStopInput[]
    deleteMany?: RouteScalarWhereInput | RouteScalarWhereInput[]
  }

  export type RouteUpdateManyWithoutEndStopNestedInput = {
    create?: XOR<RouteCreateWithoutEndStopInput, RouteUncheckedCreateWithoutEndStopInput> | RouteCreateWithoutEndStopInput[] | RouteUncheckedCreateWithoutEndStopInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutEndStopInput | RouteCreateOrConnectWithoutEndStopInput[]
    upsert?: RouteUpsertWithWhereUniqueWithoutEndStopInput | RouteUpsertWithWhereUniqueWithoutEndStopInput[]
    createMany?: RouteCreateManyEndStopInputEnvelope
    set?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    disconnect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    delete?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    update?: RouteUpdateWithWhereUniqueWithoutEndStopInput | RouteUpdateWithWhereUniqueWithoutEndStopInput[]
    updateMany?: RouteUpdateManyWithWhereWithoutEndStopInput | RouteUpdateManyWithWhereWithoutEndStopInput[]
    deleteMany?: RouteScalarWhereInput | RouteScalarWhereInput[]
  }

  export type RouteStopUpdateManyWithoutStopNestedInput = {
    create?: XOR<RouteStopCreateWithoutStopInput, RouteStopUncheckedCreateWithoutStopInput> | RouteStopCreateWithoutStopInput[] | RouteStopUncheckedCreateWithoutStopInput[]
    connectOrCreate?: RouteStopCreateOrConnectWithoutStopInput | RouteStopCreateOrConnectWithoutStopInput[]
    upsert?: RouteStopUpsertWithWhereUniqueWithoutStopInput | RouteStopUpsertWithWhereUniqueWithoutStopInput[]
    createMany?: RouteStopCreateManyStopInputEnvelope
    set?: RouteStopWhereUniqueInput | RouteStopWhereUniqueInput[]
    disconnect?: RouteStopWhereUniqueInput | RouteStopWhereUniqueInput[]
    delete?: RouteStopWhereUniqueInput | RouteStopWhereUniqueInput[]
    connect?: RouteStopWhereUniqueInput | RouteStopWhereUniqueInput[]
    update?: RouteStopUpdateWithWhereUniqueWithoutStopInput | RouteStopUpdateWithWhereUniqueWithoutStopInput[]
    updateMany?: RouteStopUpdateManyWithWhereWithoutStopInput | RouteStopUpdateManyWithWhereWithoutStopInput[]
    deleteMany?: RouteStopScalarWhereInput | RouteStopScalarWhereInput[]
  }

  export type RouteUncheckedUpdateManyWithoutStartStopNestedInput = {
    create?: XOR<RouteCreateWithoutStartStopInput, RouteUncheckedCreateWithoutStartStopInput> | RouteCreateWithoutStartStopInput[] | RouteUncheckedCreateWithoutStartStopInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutStartStopInput | RouteCreateOrConnectWithoutStartStopInput[]
    upsert?: RouteUpsertWithWhereUniqueWithoutStartStopInput | RouteUpsertWithWhereUniqueWithoutStartStopInput[]
    createMany?: RouteCreateManyStartStopInputEnvelope
    set?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    disconnect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    delete?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    update?: RouteUpdateWithWhereUniqueWithoutStartStopInput | RouteUpdateWithWhereUniqueWithoutStartStopInput[]
    updateMany?: RouteUpdateManyWithWhereWithoutStartStopInput | RouteUpdateManyWithWhereWithoutStartStopInput[]
    deleteMany?: RouteScalarWhereInput | RouteScalarWhereInput[]
  }

  export type RouteUncheckedUpdateManyWithoutEndStopNestedInput = {
    create?: XOR<RouteCreateWithoutEndStopInput, RouteUncheckedCreateWithoutEndStopInput> | RouteCreateWithoutEndStopInput[] | RouteUncheckedCreateWithoutEndStopInput[]
    connectOrCreate?: RouteCreateOrConnectWithoutEndStopInput | RouteCreateOrConnectWithoutEndStopInput[]
    upsert?: RouteUpsertWithWhereUniqueWithoutEndStopInput | RouteUpsertWithWhereUniqueWithoutEndStopInput[]
    createMany?: RouteCreateManyEndStopInputEnvelope
    set?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    disconnect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    delete?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    connect?: RouteWhereUniqueInput | RouteWhereUniqueInput[]
    update?: RouteUpdateWithWhereUniqueWithoutEndStopInput | RouteUpdateWithWhereUniqueWithoutEndStopInput[]
    updateMany?: RouteUpdateManyWithWhereWithoutEndStopInput | RouteUpdateManyWithWhereWithoutEndStopInput[]
    deleteMany?: RouteScalarWhereInput | RouteScalarWhereInput[]
  }

  export type RouteStopUncheckedUpdateManyWithoutStopNestedInput = {
    create?: XOR<RouteStopCreateWithoutStopInput, RouteStopUncheckedCreateWithoutStopInput> | RouteStopCreateWithoutStopInput[] | RouteStopUncheckedCreateWithoutStopInput[]
    connectOrCreate?: RouteStopCreateOrConnectWithoutStopInput | RouteStopCreateOrConnectWithoutStopInput[]
    upsert?: RouteStopUpsertWithWhereUniqueWithoutStopInput | RouteStopUpsertWithWhereUniqueWithoutStopInput[]
    createMany?: RouteStopCreateManyStopInputEnvelope
    set?: RouteStopWhereUniqueInput | RouteStopWhereUniqueInput[]
    disconnect?: RouteStopWhereUniqueInput | RouteStopWhereUniqueInput[]
    delete?: RouteStopWhereUniqueInput | RouteStopWhereUniqueInput[]
    connect?: RouteStopWhereUniqueInput | RouteStopWhereUniqueInput[]
    update?: RouteStopUpdateWithWhereUniqueWithoutStopInput | RouteStopUpdateWithWhereUniqueWithoutStopInput[]
    updateMany?: RouteStopUpdateManyWithWhereWithoutStopInput | RouteStopUpdateManyWithWhereWithoutStopInput[]
    deleteMany?: RouteStopScalarWhereInput | RouteStopScalarWhereInput[]
  }

  export type StopCreateNestedOneWithoutRoutesAsStartInput = {
    create?: XOR<StopCreateWithoutRoutesAsStartInput, StopUncheckedCreateWithoutRoutesAsStartInput>
    connectOrCreate?: StopCreateOrConnectWithoutRoutesAsStartInput
    connect?: StopWhereUniqueInput
  }

  export type StopCreateNestedOneWithoutRoutesAsEndInput = {
    create?: XOR<StopCreateWithoutRoutesAsEndInput, StopUncheckedCreateWithoutRoutesAsEndInput>
    connectOrCreate?: StopCreateOrConnectWithoutRoutesAsEndInput
    connect?: StopWhereUniqueInput
  }

  export type RouteStopCreateNestedManyWithoutRouteInput = {
    create?: XOR<RouteStopCreateWithoutRouteInput, RouteStopUncheckedCreateWithoutRouteInput> | RouteStopCreateWithoutRouteInput[] | RouteStopUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: RouteStopCreateOrConnectWithoutRouteInput | RouteStopCreateOrConnectWithoutRouteInput[]
    createMany?: RouteStopCreateManyRouteInputEnvelope
    connect?: RouteStopWhereUniqueInput | RouteStopWhereUniqueInput[]
  }

  export type BusAssignmentCreateNestedManyWithoutRouteInput = {
    create?: XOR<BusAssignmentCreateWithoutRouteInput, BusAssignmentUncheckedCreateWithoutRouteInput> | BusAssignmentCreateWithoutRouteInput[] | BusAssignmentUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: BusAssignmentCreateOrConnectWithoutRouteInput | BusAssignmentCreateOrConnectWithoutRouteInput[]
    createMany?: BusAssignmentCreateManyRouteInputEnvelope
    connect?: BusAssignmentWhereUniqueInput | BusAssignmentWhereUniqueInput[]
  }

  export type RouteStopUncheckedCreateNestedManyWithoutRouteInput = {
    create?: XOR<RouteStopCreateWithoutRouteInput, RouteStopUncheckedCreateWithoutRouteInput> | RouteStopCreateWithoutRouteInput[] | RouteStopUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: RouteStopCreateOrConnectWithoutRouteInput | RouteStopCreateOrConnectWithoutRouteInput[]
    createMany?: RouteStopCreateManyRouteInputEnvelope
    connect?: RouteStopWhereUniqueInput | RouteStopWhereUniqueInput[]
  }

  export type BusAssignmentUncheckedCreateNestedManyWithoutRouteInput = {
    create?: XOR<BusAssignmentCreateWithoutRouteInput, BusAssignmentUncheckedCreateWithoutRouteInput> | BusAssignmentCreateWithoutRouteInput[] | BusAssignmentUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: BusAssignmentCreateOrConnectWithoutRouteInput | BusAssignmentCreateOrConnectWithoutRouteInput[]
    createMany?: BusAssignmentCreateManyRouteInputEnvelope
    connect?: BusAssignmentWhereUniqueInput | BusAssignmentWhereUniqueInput[]
  }

  export type StopUpdateOneRequiredWithoutRoutesAsStartNestedInput = {
    create?: XOR<StopCreateWithoutRoutesAsStartInput, StopUncheckedCreateWithoutRoutesAsStartInput>
    connectOrCreate?: StopCreateOrConnectWithoutRoutesAsStartInput
    upsert?: StopUpsertWithoutRoutesAsStartInput
    connect?: StopWhereUniqueInput
    update?: XOR<XOR<StopUpdateToOneWithWhereWithoutRoutesAsStartInput, StopUpdateWithoutRoutesAsStartInput>, StopUncheckedUpdateWithoutRoutesAsStartInput>
  }

  export type StopUpdateOneRequiredWithoutRoutesAsEndNestedInput = {
    create?: XOR<StopCreateWithoutRoutesAsEndInput, StopUncheckedCreateWithoutRoutesAsEndInput>
    connectOrCreate?: StopCreateOrConnectWithoutRoutesAsEndInput
    upsert?: StopUpsertWithoutRoutesAsEndInput
    connect?: StopWhereUniqueInput
    update?: XOR<XOR<StopUpdateToOneWithWhereWithoutRoutesAsEndInput, StopUpdateWithoutRoutesAsEndInput>, StopUncheckedUpdateWithoutRoutesAsEndInput>
  }

  export type RouteStopUpdateManyWithoutRouteNestedInput = {
    create?: XOR<RouteStopCreateWithoutRouteInput, RouteStopUncheckedCreateWithoutRouteInput> | RouteStopCreateWithoutRouteInput[] | RouteStopUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: RouteStopCreateOrConnectWithoutRouteInput | RouteStopCreateOrConnectWithoutRouteInput[]
    upsert?: RouteStopUpsertWithWhereUniqueWithoutRouteInput | RouteStopUpsertWithWhereUniqueWithoutRouteInput[]
    createMany?: RouteStopCreateManyRouteInputEnvelope
    set?: RouteStopWhereUniqueInput | RouteStopWhereUniqueInput[]
    disconnect?: RouteStopWhereUniqueInput | RouteStopWhereUniqueInput[]
    delete?: RouteStopWhereUniqueInput | RouteStopWhereUniqueInput[]
    connect?: RouteStopWhereUniqueInput | RouteStopWhereUniqueInput[]
    update?: RouteStopUpdateWithWhereUniqueWithoutRouteInput | RouteStopUpdateWithWhereUniqueWithoutRouteInput[]
    updateMany?: RouteStopUpdateManyWithWhereWithoutRouteInput | RouteStopUpdateManyWithWhereWithoutRouteInput[]
    deleteMany?: RouteStopScalarWhereInput | RouteStopScalarWhereInput[]
  }

  export type BusAssignmentUpdateManyWithoutRouteNestedInput = {
    create?: XOR<BusAssignmentCreateWithoutRouteInput, BusAssignmentUncheckedCreateWithoutRouteInput> | BusAssignmentCreateWithoutRouteInput[] | BusAssignmentUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: BusAssignmentCreateOrConnectWithoutRouteInput | BusAssignmentCreateOrConnectWithoutRouteInput[]
    upsert?: BusAssignmentUpsertWithWhereUniqueWithoutRouteInput | BusAssignmentUpsertWithWhereUniqueWithoutRouteInput[]
    createMany?: BusAssignmentCreateManyRouteInputEnvelope
    set?: BusAssignmentWhereUniqueInput | BusAssignmentWhereUniqueInput[]
    disconnect?: BusAssignmentWhereUniqueInput | BusAssignmentWhereUniqueInput[]
    delete?: BusAssignmentWhereUniqueInput | BusAssignmentWhereUniqueInput[]
    connect?: BusAssignmentWhereUniqueInput | BusAssignmentWhereUniqueInput[]
    update?: BusAssignmentUpdateWithWhereUniqueWithoutRouteInput | BusAssignmentUpdateWithWhereUniqueWithoutRouteInput[]
    updateMany?: BusAssignmentUpdateManyWithWhereWithoutRouteInput | BusAssignmentUpdateManyWithWhereWithoutRouteInput[]
    deleteMany?: BusAssignmentScalarWhereInput | BusAssignmentScalarWhereInput[]
  }

  export type RouteStopUncheckedUpdateManyWithoutRouteNestedInput = {
    create?: XOR<RouteStopCreateWithoutRouteInput, RouteStopUncheckedCreateWithoutRouteInput> | RouteStopCreateWithoutRouteInput[] | RouteStopUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: RouteStopCreateOrConnectWithoutRouteInput | RouteStopCreateOrConnectWithoutRouteInput[]
    upsert?: RouteStopUpsertWithWhereUniqueWithoutRouteInput | RouteStopUpsertWithWhereUniqueWithoutRouteInput[]
    createMany?: RouteStopCreateManyRouteInputEnvelope
    set?: RouteStopWhereUniqueInput | RouteStopWhereUniqueInput[]
    disconnect?: RouteStopWhereUniqueInput | RouteStopWhereUniqueInput[]
    delete?: RouteStopWhereUniqueInput | RouteStopWhereUniqueInput[]
    connect?: RouteStopWhereUniqueInput | RouteStopWhereUniqueInput[]
    update?: RouteStopUpdateWithWhereUniqueWithoutRouteInput | RouteStopUpdateWithWhereUniqueWithoutRouteInput[]
    updateMany?: RouteStopUpdateManyWithWhereWithoutRouteInput | RouteStopUpdateManyWithWhereWithoutRouteInput[]
    deleteMany?: RouteStopScalarWhereInput | RouteStopScalarWhereInput[]
  }

  export type BusAssignmentUncheckedUpdateManyWithoutRouteNestedInput = {
    create?: XOR<BusAssignmentCreateWithoutRouteInput, BusAssignmentUncheckedCreateWithoutRouteInput> | BusAssignmentCreateWithoutRouteInput[] | BusAssignmentUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: BusAssignmentCreateOrConnectWithoutRouteInput | BusAssignmentCreateOrConnectWithoutRouteInput[]
    upsert?: BusAssignmentUpsertWithWhereUniqueWithoutRouteInput | BusAssignmentUpsertWithWhereUniqueWithoutRouteInput[]
    createMany?: BusAssignmentCreateManyRouteInputEnvelope
    set?: BusAssignmentWhereUniqueInput | BusAssignmentWhereUniqueInput[]
    disconnect?: BusAssignmentWhereUniqueInput | BusAssignmentWhereUniqueInput[]
    delete?: BusAssignmentWhereUniqueInput | BusAssignmentWhereUniqueInput[]
    connect?: BusAssignmentWhereUniqueInput | BusAssignmentWhereUniqueInput[]
    update?: BusAssignmentUpdateWithWhereUniqueWithoutRouteInput | BusAssignmentUpdateWithWhereUniqueWithoutRouteInput[]
    updateMany?: BusAssignmentUpdateManyWithWhereWithoutRouteInput | BusAssignmentUpdateManyWithWhereWithoutRouteInput[]
    deleteMany?: BusAssignmentScalarWhereInput | BusAssignmentScalarWhereInput[]
  }

  export type RouteCreateNestedOneWithoutRouteStopsInput = {
    create?: XOR<RouteCreateWithoutRouteStopsInput, RouteUncheckedCreateWithoutRouteStopsInput>
    connectOrCreate?: RouteCreateOrConnectWithoutRouteStopsInput
    connect?: RouteWhereUniqueInput
  }

  export type StopCreateNestedOneWithoutRouteStopsInput = {
    create?: XOR<StopCreateWithoutRouteStopsInput, StopUncheckedCreateWithoutRouteStopsInput>
    connectOrCreate?: StopCreateOrConnectWithoutRouteStopsInput
    connect?: StopWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RouteUpdateOneRequiredWithoutRouteStopsNestedInput = {
    create?: XOR<RouteCreateWithoutRouteStopsInput, RouteUncheckedCreateWithoutRouteStopsInput>
    connectOrCreate?: RouteCreateOrConnectWithoutRouteStopsInput
    upsert?: RouteUpsertWithoutRouteStopsInput
    connect?: RouteWhereUniqueInput
    update?: XOR<XOR<RouteUpdateToOneWithWhereWithoutRouteStopsInput, RouteUpdateWithoutRouteStopsInput>, RouteUncheckedUpdateWithoutRouteStopsInput>
  }

  export type StopUpdateOneRequiredWithoutRouteStopsNestedInput = {
    create?: XOR<StopCreateWithoutRouteStopsInput, StopUncheckedCreateWithoutRouteStopsInput>
    connectOrCreate?: StopCreateOrConnectWithoutRouteStopsInput
    upsert?: StopUpsertWithoutRouteStopsInput
    connect?: StopWhereUniqueInput
    update?: XOR<XOR<StopUpdateToOneWithWhereWithoutRouteStopsInput, StopUpdateWithoutRouteStopsInput>, StopUncheckedUpdateWithoutRouteStopsInput>
  }

  export type RouteCreateNestedOneWithoutBusAssignmentsInput = {
    create?: XOR<RouteCreateWithoutBusAssignmentsInput, RouteUncheckedCreateWithoutBusAssignmentsInput>
    connectOrCreate?: RouteCreateOrConnectWithoutBusAssignmentsInput
    connect?: RouteWhereUniqueInput
  }

  export type RegularBusAssignmentCreateNestedOneWithoutBusAssignmentInput = {
    create?: XOR<RegularBusAssignmentCreateWithoutBusAssignmentInput, RegularBusAssignmentUncheckedCreateWithoutBusAssignmentInput>
    connectOrCreate?: RegularBusAssignmentCreateOrConnectWithoutBusAssignmentInput
    connect?: RegularBusAssignmentWhereUniqueInput
  }

  export type RegularBusAssignmentUncheckedCreateNestedOneWithoutBusAssignmentInput = {
    create?: XOR<RegularBusAssignmentCreateWithoutBusAssignmentInput, RegularBusAssignmentUncheckedCreateWithoutBusAssignmentInput>
    connectOrCreate?: RegularBusAssignmentCreateOrConnectWithoutBusAssignmentInput
    connect?: RegularBusAssignmentWhereUniqueInput
  }

  export type EnumBusOperationStatusFieldUpdateOperationsInput = {
    set?: $Enums.BusOperationStatus
  }

  export type RouteUpdateOneRequiredWithoutBusAssignmentsNestedInput = {
    create?: XOR<RouteCreateWithoutBusAssignmentsInput, RouteUncheckedCreateWithoutBusAssignmentsInput>
    connectOrCreate?: RouteCreateOrConnectWithoutBusAssignmentsInput
    upsert?: RouteUpsertWithoutBusAssignmentsInput
    connect?: RouteWhereUniqueInput
    update?: XOR<XOR<RouteUpdateToOneWithWhereWithoutBusAssignmentsInput, RouteUpdateWithoutBusAssignmentsInput>, RouteUncheckedUpdateWithoutBusAssignmentsInput>
  }

  export type RegularBusAssignmentUpdateOneWithoutBusAssignmentNestedInput = {
    create?: XOR<RegularBusAssignmentCreateWithoutBusAssignmentInput, RegularBusAssignmentUncheckedCreateWithoutBusAssignmentInput>
    connectOrCreate?: RegularBusAssignmentCreateOrConnectWithoutBusAssignmentInput
    upsert?: RegularBusAssignmentUpsertWithoutBusAssignmentInput
    disconnect?: RegularBusAssignmentWhereInput | boolean
    delete?: RegularBusAssignmentWhereInput | boolean
    connect?: RegularBusAssignmentWhereUniqueInput
    update?: XOR<XOR<RegularBusAssignmentUpdateToOneWithWhereWithoutBusAssignmentInput, RegularBusAssignmentUpdateWithoutBusAssignmentInput>, RegularBusAssignmentUncheckedUpdateWithoutBusAssignmentInput>
  }

  export type RegularBusAssignmentUncheckedUpdateOneWithoutBusAssignmentNestedInput = {
    create?: XOR<RegularBusAssignmentCreateWithoutBusAssignmentInput, RegularBusAssignmentUncheckedCreateWithoutBusAssignmentInput>
    connectOrCreate?: RegularBusAssignmentCreateOrConnectWithoutBusAssignmentInput
    upsert?: RegularBusAssignmentUpsertWithoutBusAssignmentInput
    disconnect?: RegularBusAssignmentWhereInput | boolean
    delete?: RegularBusAssignmentWhereInput | boolean
    connect?: RegularBusAssignmentWhereUniqueInput
    update?: XOR<XOR<RegularBusAssignmentUpdateToOneWithWhereWithoutBusAssignmentInput, RegularBusAssignmentUpdateWithoutBusAssignmentInput>, RegularBusAssignmentUncheckedUpdateWithoutBusAssignmentInput>
  }

  export type Quota_PolicyCreateNestedOneWithoutRegularBusAssignmentsInput = {
    create?: XOR<Quota_PolicyCreateWithoutRegularBusAssignmentsInput, Quota_PolicyUncheckedCreateWithoutRegularBusAssignmentsInput>
    connectOrCreate?: Quota_PolicyCreateOrConnectWithoutRegularBusAssignmentsInput
    connect?: Quota_PolicyWhereUniqueInput
  }

  export type BusAssignmentCreateNestedOneWithoutRegularBusAssignmentInput = {
    create?: XOR<BusAssignmentCreateWithoutRegularBusAssignmentInput, BusAssignmentUncheckedCreateWithoutRegularBusAssignmentInput>
    connectOrCreate?: BusAssignmentCreateOrConnectWithoutRegularBusAssignmentInput
    connect?: BusAssignmentWhereUniqueInput
  }

  export type Quota_PolicyUpdateOneRequiredWithoutRegularBusAssignmentsNestedInput = {
    create?: XOR<Quota_PolicyCreateWithoutRegularBusAssignmentsInput, Quota_PolicyUncheckedCreateWithoutRegularBusAssignmentsInput>
    connectOrCreate?: Quota_PolicyCreateOrConnectWithoutRegularBusAssignmentsInput
    upsert?: Quota_PolicyUpsertWithoutRegularBusAssignmentsInput
    connect?: Quota_PolicyWhereUniqueInput
    update?: XOR<XOR<Quota_PolicyUpdateToOneWithWhereWithoutRegularBusAssignmentsInput, Quota_PolicyUpdateWithoutRegularBusAssignmentsInput>, Quota_PolicyUncheckedUpdateWithoutRegularBusAssignmentsInput>
  }

  export type BusAssignmentUpdateOneRequiredWithoutRegularBusAssignmentNestedInput = {
    create?: XOR<BusAssignmentCreateWithoutRegularBusAssignmentInput, BusAssignmentUncheckedCreateWithoutRegularBusAssignmentInput>
    connectOrCreate?: BusAssignmentCreateOrConnectWithoutRegularBusAssignmentInput
    upsert?: BusAssignmentUpsertWithoutRegularBusAssignmentInput
    connect?: BusAssignmentWhereUniqueInput
    update?: XOR<XOR<BusAssignmentUpdateToOneWithWhereWithoutRegularBusAssignmentInput, BusAssignmentUpdateWithoutRegularBusAssignmentInput>, BusAssignmentUncheckedUpdateWithoutRegularBusAssignmentInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedEnumBusOperationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BusOperationStatus | EnumBusOperationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BusOperationStatus[] | ListEnumBusOperationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusOperationStatus[] | ListEnumBusOperationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBusOperationStatusFilter<$PrismaModel> | $Enums.BusOperationStatus
  }

  export type NestedEnumBusOperationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BusOperationStatus | EnumBusOperationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BusOperationStatus[] | ListEnumBusOperationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusOperationStatus[] | ListEnumBusOperationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBusOperationStatusWithAggregatesFilter<$PrismaModel> | $Enums.BusOperationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBusOperationStatusFilter<$PrismaModel>
    _max?: NestedEnumBusOperationStatusFilter<$PrismaModel>
  }

  export type FixedCreateWithoutQuotaPolicyInput = {
    Quota: number
  }

  export type FixedUncheckedCreateWithoutQuotaPolicyInput = {
    Quota: number
  }

  export type FixedCreateOrConnectWithoutQuotaPolicyInput = {
    where: FixedWhereUniqueInput
    create: XOR<FixedCreateWithoutQuotaPolicyInput, FixedUncheckedCreateWithoutQuotaPolicyInput>
  }

  export type PercentageCreateWithoutQuotaPolicyInput = {
    Percentage: number
  }

  export type PercentageUncheckedCreateWithoutQuotaPolicyInput = {
    Percentage: number
  }

  export type PercentageCreateOrConnectWithoutQuotaPolicyInput = {
    where: PercentageWhereUniqueInput
    create: XOR<PercentageCreateWithoutQuotaPolicyInput, PercentageUncheckedCreateWithoutQuotaPolicyInput>
  }

  export type RegularBusAssignmentCreateWithoutQuotaPolicyInput = {
    DriverID: string
    ConductorID: string
    Change: number
    TripRevenue: number
    BusAssignment: BusAssignmentCreateNestedOneWithoutRegularBusAssignmentInput
  }

  export type RegularBusAssignmentUncheckedCreateWithoutQuotaPolicyInput = {
    RegularBusAssignmentID: string
    DriverID: string
    ConductorID: string
    Change: number
    TripRevenue: number
  }

  export type RegularBusAssignmentCreateOrConnectWithoutQuotaPolicyInput = {
    where: RegularBusAssignmentWhereUniqueInput
    create: XOR<RegularBusAssignmentCreateWithoutQuotaPolicyInput, RegularBusAssignmentUncheckedCreateWithoutQuotaPolicyInput>
  }

  export type RegularBusAssignmentCreateManyQuotaPolicyInputEnvelope = {
    data: RegularBusAssignmentCreateManyQuotaPolicyInput | RegularBusAssignmentCreateManyQuotaPolicyInput[]
    skipDuplicates?: boolean
  }

  export type FixedUpsertWithoutQuotaPolicyInput = {
    update: XOR<FixedUpdateWithoutQuotaPolicyInput, FixedUncheckedUpdateWithoutQuotaPolicyInput>
    create: XOR<FixedCreateWithoutQuotaPolicyInput, FixedUncheckedCreateWithoutQuotaPolicyInput>
    where?: FixedWhereInput
  }

  export type FixedUpdateToOneWithWhereWithoutQuotaPolicyInput = {
    where?: FixedWhereInput
    data: XOR<FixedUpdateWithoutQuotaPolicyInput, FixedUncheckedUpdateWithoutQuotaPolicyInput>
  }

  export type FixedUpdateWithoutQuotaPolicyInput = {
    Quota?: FloatFieldUpdateOperationsInput | number
  }

  export type FixedUncheckedUpdateWithoutQuotaPolicyInput = {
    Quota?: FloatFieldUpdateOperationsInput | number
  }

  export type PercentageUpsertWithoutQuotaPolicyInput = {
    update: XOR<PercentageUpdateWithoutQuotaPolicyInput, PercentageUncheckedUpdateWithoutQuotaPolicyInput>
    create: XOR<PercentageCreateWithoutQuotaPolicyInput, PercentageUncheckedCreateWithoutQuotaPolicyInput>
    where?: PercentageWhereInput
  }

  export type PercentageUpdateToOneWithWhereWithoutQuotaPolicyInput = {
    where?: PercentageWhereInput
    data: XOR<PercentageUpdateWithoutQuotaPolicyInput, PercentageUncheckedUpdateWithoutQuotaPolicyInput>
  }

  export type PercentageUpdateWithoutQuotaPolicyInput = {
    Percentage?: FloatFieldUpdateOperationsInput | number
  }

  export type PercentageUncheckedUpdateWithoutQuotaPolicyInput = {
    Percentage?: FloatFieldUpdateOperationsInput | number
  }

  export type RegularBusAssignmentUpsertWithWhereUniqueWithoutQuotaPolicyInput = {
    where: RegularBusAssignmentWhereUniqueInput
    update: XOR<RegularBusAssignmentUpdateWithoutQuotaPolicyInput, RegularBusAssignmentUncheckedUpdateWithoutQuotaPolicyInput>
    create: XOR<RegularBusAssignmentCreateWithoutQuotaPolicyInput, RegularBusAssignmentUncheckedCreateWithoutQuotaPolicyInput>
  }

  export type RegularBusAssignmentUpdateWithWhereUniqueWithoutQuotaPolicyInput = {
    where: RegularBusAssignmentWhereUniqueInput
    data: XOR<RegularBusAssignmentUpdateWithoutQuotaPolicyInput, RegularBusAssignmentUncheckedUpdateWithoutQuotaPolicyInput>
  }

  export type RegularBusAssignmentUpdateManyWithWhereWithoutQuotaPolicyInput = {
    where: RegularBusAssignmentScalarWhereInput
    data: XOR<RegularBusAssignmentUpdateManyMutationInput, RegularBusAssignmentUncheckedUpdateManyWithoutQuotaPolicyInput>
  }

  export type RegularBusAssignmentScalarWhereInput = {
    AND?: RegularBusAssignmentScalarWhereInput | RegularBusAssignmentScalarWhereInput[]
    OR?: RegularBusAssignmentScalarWhereInput[]
    NOT?: RegularBusAssignmentScalarWhereInput | RegularBusAssignmentScalarWhereInput[]
    RegularBusAssignmentID?: StringFilter<"RegularBusAssignment"> | string
    DriverID?: StringFilter<"RegularBusAssignment"> | string
    ConductorID?: StringFilter<"RegularBusAssignment"> | string
    QuotaPolicyID?: StringFilter<"RegularBusAssignment"> | string
    Change?: FloatFilter<"RegularBusAssignment"> | number
    TripRevenue?: FloatFilter<"RegularBusAssignment"> | number
  }

  export type Quota_PolicyCreateWithoutFixedInput = {
    QuotaPolicyID: string
    StartDate: Date | string
    EndDate: Date | string
    Percentage?: PercentageCreateNestedOneWithoutQuotaPolicyInput
    RegularBusAssignments?: RegularBusAssignmentCreateNestedManyWithoutQuotaPolicyInput
  }

  export type Quota_PolicyUncheckedCreateWithoutFixedInput = {
    QuotaPolicyID: string
    StartDate: Date | string
    EndDate: Date | string
    Percentage?: PercentageUncheckedCreateNestedOneWithoutQuotaPolicyInput
    RegularBusAssignments?: RegularBusAssignmentUncheckedCreateNestedManyWithoutQuotaPolicyInput
  }

  export type Quota_PolicyCreateOrConnectWithoutFixedInput = {
    where: Quota_PolicyWhereUniqueInput
    create: XOR<Quota_PolicyCreateWithoutFixedInput, Quota_PolicyUncheckedCreateWithoutFixedInput>
  }

  export type Quota_PolicyUpsertWithoutFixedInput = {
    update: XOR<Quota_PolicyUpdateWithoutFixedInput, Quota_PolicyUncheckedUpdateWithoutFixedInput>
    create: XOR<Quota_PolicyCreateWithoutFixedInput, Quota_PolicyUncheckedCreateWithoutFixedInput>
    where?: Quota_PolicyWhereInput
  }

  export type Quota_PolicyUpdateToOneWithWhereWithoutFixedInput = {
    where?: Quota_PolicyWhereInput
    data: XOR<Quota_PolicyUpdateWithoutFixedInput, Quota_PolicyUncheckedUpdateWithoutFixedInput>
  }

  export type Quota_PolicyUpdateWithoutFixedInput = {
    QuotaPolicyID?: StringFieldUpdateOperationsInput | string
    StartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    EndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    Percentage?: PercentageUpdateOneWithoutQuotaPolicyNestedInput
    RegularBusAssignments?: RegularBusAssignmentUpdateManyWithoutQuotaPolicyNestedInput
  }

  export type Quota_PolicyUncheckedUpdateWithoutFixedInput = {
    QuotaPolicyID?: StringFieldUpdateOperationsInput | string
    StartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    EndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    Percentage?: PercentageUncheckedUpdateOneWithoutQuotaPolicyNestedInput
    RegularBusAssignments?: RegularBusAssignmentUncheckedUpdateManyWithoutQuotaPolicyNestedInput
  }

  export type Quota_PolicyCreateWithoutPercentageInput = {
    QuotaPolicyID: string
    StartDate: Date | string
    EndDate: Date | string
    Fixed?: FixedCreateNestedOneWithoutQuotaPolicyInput
    RegularBusAssignments?: RegularBusAssignmentCreateNestedManyWithoutQuotaPolicyInput
  }

  export type Quota_PolicyUncheckedCreateWithoutPercentageInput = {
    QuotaPolicyID: string
    StartDate: Date | string
    EndDate: Date | string
    Fixed?: FixedUncheckedCreateNestedOneWithoutQuotaPolicyInput
    RegularBusAssignments?: RegularBusAssignmentUncheckedCreateNestedManyWithoutQuotaPolicyInput
  }

  export type Quota_PolicyCreateOrConnectWithoutPercentageInput = {
    where: Quota_PolicyWhereUniqueInput
    create: XOR<Quota_PolicyCreateWithoutPercentageInput, Quota_PolicyUncheckedCreateWithoutPercentageInput>
  }

  export type Quota_PolicyUpsertWithoutPercentageInput = {
    update: XOR<Quota_PolicyUpdateWithoutPercentageInput, Quota_PolicyUncheckedUpdateWithoutPercentageInput>
    create: XOR<Quota_PolicyCreateWithoutPercentageInput, Quota_PolicyUncheckedCreateWithoutPercentageInput>
    where?: Quota_PolicyWhereInput
  }

  export type Quota_PolicyUpdateToOneWithWhereWithoutPercentageInput = {
    where?: Quota_PolicyWhereInput
    data: XOR<Quota_PolicyUpdateWithoutPercentageInput, Quota_PolicyUncheckedUpdateWithoutPercentageInput>
  }

  export type Quota_PolicyUpdateWithoutPercentageInput = {
    QuotaPolicyID?: StringFieldUpdateOperationsInput | string
    StartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    EndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    Fixed?: FixedUpdateOneWithoutQuotaPolicyNestedInput
    RegularBusAssignments?: RegularBusAssignmentUpdateManyWithoutQuotaPolicyNestedInput
  }

  export type Quota_PolicyUncheckedUpdateWithoutPercentageInput = {
    QuotaPolicyID?: StringFieldUpdateOperationsInput | string
    StartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    EndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    Fixed?: FixedUncheckedUpdateOneWithoutQuotaPolicyNestedInput
    RegularBusAssignments?: RegularBusAssignmentUncheckedUpdateManyWithoutQuotaPolicyNestedInput
  }

  export type RouteCreateWithoutStartStopInput = {
    RouteID: string
    RouteName: string
    IsDeleted: boolean
    EndStop: StopCreateNestedOneWithoutRoutesAsEndInput
    RouteStops?: RouteStopCreateNestedManyWithoutRouteInput
    BusAssignments?: BusAssignmentCreateNestedManyWithoutRouteInput
  }

  export type RouteUncheckedCreateWithoutStartStopInput = {
    RouteID: string
    EndStopID: string
    RouteName: string
    IsDeleted: boolean
    RouteStops?: RouteStopUncheckedCreateNestedManyWithoutRouteInput
    BusAssignments?: BusAssignmentUncheckedCreateNestedManyWithoutRouteInput
  }

  export type RouteCreateOrConnectWithoutStartStopInput = {
    where: RouteWhereUniqueInput
    create: XOR<RouteCreateWithoutStartStopInput, RouteUncheckedCreateWithoutStartStopInput>
  }

  export type RouteCreateManyStartStopInputEnvelope = {
    data: RouteCreateManyStartStopInput | RouteCreateManyStartStopInput[]
    skipDuplicates?: boolean
  }

  export type RouteCreateWithoutEndStopInput = {
    RouteID: string
    RouteName: string
    IsDeleted: boolean
    StartStop: StopCreateNestedOneWithoutRoutesAsStartInput
    RouteStops?: RouteStopCreateNestedManyWithoutRouteInput
    BusAssignments?: BusAssignmentCreateNestedManyWithoutRouteInput
  }

  export type RouteUncheckedCreateWithoutEndStopInput = {
    RouteID: string
    StartStopID: string
    RouteName: string
    IsDeleted: boolean
    RouteStops?: RouteStopUncheckedCreateNestedManyWithoutRouteInput
    BusAssignments?: BusAssignmentUncheckedCreateNestedManyWithoutRouteInput
  }

  export type RouteCreateOrConnectWithoutEndStopInput = {
    where: RouteWhereUniqueInput
    create: XOR<RouteCreateWithoutEndStopInput, RouteUncheckedCreateWithoutEndStopInput>
  }

  export type RouteCreateManyEndStopInputEnvelope = {
    data: RouteCreateManyEndStopInput | RouteCreateManyEndStopInput[]
    skipDuplicates?: boolean
  }

  export type RouteStopCreateWithoutStopInput = {
    RouteStopID: string
    StopOrder: number
    Route: RouteCreateNestedOneWithoutRouteStopsInput
  }

  export type RouteStopUncheckedCreateWithoutStopInput = {
    RouteStopID: string
    RouteID: string
    StopOrder: number
  }

  export type RouteStopCreateOrConnectWithoutStopInput = {
    where: RouteStopWhereUniqueInput
    create: XOR<RouteStopCreateWithoutStopInput, RouteStopUncheckedCreateWithoutStopInput>
  }

  export type RouteStopCreateManyStopInputEnvelope = {
    data: RouteStopCreateManyStopInput | RouteStopCreateManyStopInput[]
    skipDuplicates?: boolean
  }

  export type RouteUpsertWithWhereUniqueWithoutStartStopInput = {
    where: RouteWhereUniqueInput
    update: XOR<RouteUpdateWithoutStartStopInput, RouteUncheckedUpdateWithoutStartStopInput>
    create: XOR<RouteCreateWithoutStartStopInput, RouteUncheckedCreateWithoutStartStopInput>
  }

  export type RouteUpdateWithWhereUniqueWithoutStartStopInput = {
    where: RouteWhereUniqueInput
    data: XOR<RouteUpdateWithoutStartStopInput, RouteUncheckedUpdateWithoutStartStopInput>
  }

  export type RouteUpdateManyWithWhereWithoutStartStopInput = {
    where: RouteScalarWhereInput
    data: XOR<RouteUpdateManyMutationInput, RouteUncheckedUpdateManyWithoutStartStopInput>
  }

  export type RouteScalarWhereInput = {
    AND?: RouteScalarWhereInput | RouteScalarWhereInput[]
    OR?: RouteScalarWhereInput[]
    NOT?: RouteScalarWhereInput | RouteScalarWhereInput[]
    RouteID?: StringFilter<"Route"> | string
    StartStopID?: StringFilter<"Route"> | string
    EndStopID?: StringFilter<"Route"> | string
    RouteName?: StringFilter<"Route"> | string
    IsDeleted?: BoolFilter<"Route"> | boolean
  }

  export type RouteUpsertWithWhereUniqueWithoutEndStopInput = {
    where: RouteWhereUniqueInput
    update: XOR<RouteUpdateWithoutEndStopInput, RouteUncheckedUpdateWithoutEndStopInput>
    create: XOR<RouteCreateWithoutEndStopInput, RouteUncheckedCreateWithoutEndStopInput>
  }

  export type RouteUpdateWithWhereUniqueWithoutEndStopInput = {
    where: RouteWhereUniqueInput
    data: XOR<RouteUpdateWithoutEndStopInput, RouteUncheckedUpdateWithoutEndStopInput>
  }

  export type RouteUpdateManyWithWhereWithoutEndStopInput = {
    where: RouteScalarWhereInput
    data: XOR<RouteUpdateManyMutationInput, RouteUncheckedUpdateManyWithoutEndStopInput>
  }

  export type RouteStopUpsertWithWhereUniqueWithoutStopInput = {
    where: RouteStopWhereUniqueInput
    update: XOR<RouteStopUpdateWithoutStopInput, RouteStopUncheckedUpdateWithoutStopInput>
    create: XOR<RouteStopCreateWithoutStopInput, RouteStopUncheckedCreateWithoutStopInput>
  }

  export type RouteStopUpdateWithWhereUniqueWithoutStopInput = {
    where: RouteStopWhereUniqueInput
    data: XOR<RouteStopUpdateWithoutStopInput, RouteStopUncheckedUpdateWithoutStopInput>
  }

  export type RouteStopUpdateManyWithWhereWithoutStopInput = {
    where: RouteStopScalarWhereInput
    data: XOR<RouteStopUpdateManyMutationInput, RouteStopUncheckedUpdateManyWithoutStopInput>
  }

  export type RouteStopScalarWhereInput = {
    AND?: RouteStopScalarWhereInput | RouteStopScalarWhereInput[]
    OR?: RouteStopScalarWhereInput[]
    NOT?: RouteStopScalarWhereInput | RouteStopScalarWhereInput[]
    RouteStopID?: StringFilter<"RouteStop"> | string
    RouteID?: StringFilter<"RouteStop"> | string
    StopID?: StringFilter<"RouteStop"> | string
    StopOrder?: IntFilter<"RouteStop"> | number
  }

  export type StopCreateWithoutRoutesAsStartInput = {
    StopID: string
    StopName: string
    latitude: string
    longitude: string
    IsDeleted: boolean
    routesAsEnd?: RouteCreateNestedManyWithoutEndStopInput
    RouteStops?: RouteStopCreateNestedManyWithoutStopInput
  }

  export type StopUncheckedCreateWithoutRoutesAsStartInput = {
    StopID: string
    StopName: string
    latitude: string
    longitude: string
    IsDeleted: boolean
    routesAsEnd?: RouteUncheckedCreateNestedManyWithoutEndStopInput
    RouteStops?: RouteStopUncheckedCreateNestedManyWithoutStopInput
  }

  export type StopCreateOrConnectWithoutRoutesAsStartInput = {
    where: StopWhereUniqueInput
    create: XOR<StopCreateWithoutRoutesAsStartInput, StopUncheckedCreateWithoutRoutesAsStartInput>
  }

  export type StopCreateWithoutRoutesAsEndInput = {
    StopID: string
    StopName: string
    latitude: string
    longitude: string
    IsDeleted: boolean
    routesAsStart?: RouteCreateNestedManyWithoutStartStopInput
    RouteStops?: RouteStopCreateNestedManyWithoutStopInput
  }

  export type StopUncheckedCreateWithoutRoutesAsEndInput = {
    StopID: string
    StopName: string
    latitude: string
    longitude: string
    IsDeleted: boolean
    routesAsStart?: RouteUncheckedCreateNestedManyWithoutStartStopInput
    RouteStops?: RouteStopUncheckedCreateNestedManyWithoutStopInput
  }

  export type StopCreateOrConnectWithoutRoutesAsEndInput = {
    where: StopWhereUniqueInput
    create: XOR<StopCreateWithoutRoutesAsEndInput, StopUncheckedCreateWithoutRoutesAsEndInput>
  }

  export type RouteStopCreateWithoutRouteInput = {
    RouteStopID: string
    StopOrder: number
    Stop: StopCreateNestedOneWithoutRouteStopsInput
  }

  export type RouteStopUncheckedCreateWithoutRouteInput = {
    RouteStopID: string
    StopID: string
    StopOrder: number
  }

  export type RouteStopCreateOrConnectWithoutRouteInput = {
    where: RouteStopWhereUniqueInput
    create: XOR<RouteStopCreateWithoutRouteInput, RouteStopUncheckedCreateWithoutRouteInput>
  }

  export type RouteStopCreateManyRouteInputEnvelope = {
    data: RouteStopCreateManyRouteInput | RouteStopCreateManyRouteInput[]
    skipDuplicates?: boolean
  }

  export type BusAssignmentCreateWithoutRouteInput = {
    BusAssignmentID: string
    BusID: string
    AssignmentDate: Date | string
    Battery?: boolean
    Lights?: boolean
    Oil?: boolean
    Water?: boolean
    Break?: boolean
    Air?: boolean
    Gas?: boolean
    Engine?: boolean
    TireCondition?: boolean
    Self_Driver?: boolean
    Self_Conductor?: boolean
    IsDeleted?: boolean
    Status?: $Enums.BusOperationStatus
    RegularBusAssignment?: RegularBusAssignmentCreateNestedOneWithoutBusAssignmentInput
  }

  export type BusAssignmentUncheckedCreateWithoutRouteInput = {
    BusAssignmentID: string
    BusID: string
    AssignmentDate: Date | string
    Battery?: boolean
    Lights?: boolean
    Oil?: boolean
    Water?: boolean
    Break?: boolean
    Air?: boolean
    Gas?: boolean
    Engine?: boolean
    TireCondition?: boolean
    Self_Driver?: boolean
    Self_Conductor?: boolean
    IsDeleted?: boolean
    Status?: $Enums.BusOperationStatus
    RegularBusAssignment?: RegularBusAssignmentUncheckedCreateNestedOneWithoutBusAssignmentInput
  }

  export type BusAssignmentCreateOrConnectWithoutRouteInput = {
    where: BusAssignmentWhereUniqueInput
    create: XOR<BusAssignmentCreateWithoutRouteInput, BusAssignmentUncheckedCreateWithoutRouteInput>
  }

  export type BusAssignmentCreateManyRouteInputEnvelope = {
    data: BusAssignmentCreateManyRouteInput | BusAssignmentCreateManyRouteInput[]
    skipDuplicates?: boolean
  }

  export type StopUpsertWithoutRoutesAsStartInput = {
    update: XOR<StopUpdateWithoutRoutesAsStartInput, StopUncheckedUpdateWithoutRoutesAsStartInput>
    create: XOR<StopCreateWithoutRoutesAsStartInput, StopUncheckedCreateWithoutRoutesAsStartInput>
    where?: StopWhereInput
  }

  export type StopUpdateToOneWithWhereWithoutRoutesAsStartInput = {
    where?: StopWhereInput
    data: XOR<StopUpdateWithoutRoutesAsStartInput, StopUncheckedUpdateWithoutRoutesAsStartInput>
  }

  export type StopUpdateWithoutRoutesAsStartInput = {
    StopID?: StringFieldUpdateOperationsInput | string
    StopName?: StringFieldUpdateOperationsInput | string
    latitude?: StringFieldUpdateOperationsInput | string
    longitude?: StringFieldUpdateOperationsInput | string
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    routesAsEnd?: RouteUpdateManyWithoutEndStopNestedInput
    RouteStops?: RouteStopUpdateManyWithoutStopNestedInput
  }

  export type StopUncheckedUpdateWithoutRoutesAsStartInput = {
    StopID?: StringFieldUpdateOperationsInput | string
    StopName?: StringFieldUpdateOperationsInput | string
    latitude?: StringFieldUpdateOperationsInput | string
    longitude?: StringFieldUpdateOperationsInput | string
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    routesAsEnd?: RouteUncheckedUpdateManyWithoutEndStopNestedInput
    RouteStops?: RouteStopUncheckedUpdateManyWithoutStopNestedInput
  }

  export type StopUpsertWithoutRoutesAsEndInput = {
    update: XOR<StopUpdateWithoutRoutesAsEndInput, StopUncheckedUpdateWithoutRoutesAsEndInput>
    create: XOR<StopCreateWithoutRoutesAsEndInput, StopUncheckedCreateWithoutRoutesAsEndInput>
    where?: StopWhereInput
  }

  export type StopUpdateToOneWithWhereWithoutRoutesAsEndInput = {
    where?: StopWhereInput
    data: XOR<StopUpdateWithoutRoutesAsEndInput, StopUncheckedUpdateWithoutRoutesAsEndInput>
  }

  export type StopUpdateWithoutRoutesAsEndInput = {
    StopID?: StringFieldUpdateOperationsInput | string
    StopName?: StringFieldUpdateOperationsInput | string
    latitude?: StringFieldUpdateOperationsInput | string
    longitude?: StringFieldUpdateOperationsInput | string
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    routesAsStart?: RouteUpdateManyWithoutStartStopNestedInput
    RouteStops?: RouteStopUpdateManyWithoutStopNestedInput
  }

  export type StopUncheckedUpdateWithoutRoutesAsEndInput = {
    StopID?: StringFieldUpdateOperationsInput | string
    StopName?: StringFieldUpdateOperationsInput | string
    latitude?: StringFieldUpdateOperationsInput | string
    longitude?: StringFieldUpdateOperationsInput | string
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    routesAsStart?: RouteUncheckedUpdateManyWithoutStartStopNestedInput
    RouteStops?: RouteStopUncheckedUpdateManyWithoutStopNestedInput
  }

  export type RouteStopUpsertWithWhereUniqueWithoutRouteInput = {
    where: RouteStopWhereUniqueInput
    update: XOR<RouteStopUpdateWithoutRouteInput, RouteStopUncheckedUpdateWithoutRouteInput>
    create: XOR<RouteStopCreateWithoutRouteInput, RouteStopUncheckedCreateWithoutRouteInput>
  }

  export type RouteStopUpdateWithWhereUniqueWithoutRouteInput = {
    where: RouteStopWhereUniqueInput
    data: XOR<RouteStopUpdateWithoutRouteInput, RouteStopUncheckedUpdateWithoutRouteInput>
  }

  export type RouteStopUpdateManyWithWhereWithoutRouteInput = {
    where: RouteStopScalarWhereInput
    data: XOR<RouteStopUpdateManyMutationInput, RouteStopUncheckedUpdateManyWithoutRouteInput>
  }

  export type BusAssignmentUpsertWithWhereUniqueWithoutRouteInput = {
    where: BusAssignmentWhereUniqueInput
    update: XOR<BusAssignmentUpdateWithoutRouteInput, BusAssignmentUncheckedUpdateWithoutRouteInput>
    create: XOR<BusAssignmentCreateWithoutRouteInput, BusAssignmentUncheckedCreateWithoutRouteInput>
  }

  export type BusAssignmentUpdateWithWhereUniqueWithoutRouteInput = {
    where: BusAssignmentWhereUniqueInput
    data: XOR<BusAssignmentUpdateWithoutRouteInput, BusAssignmentUncheckedUpdateWithoutRouteInput>
  }

  export type BusAssignmentUpdateManyWithWhereWithoutRouteInput = {
    where: BusAssignmentScalarWhereInput
    data: XOR<BusAssignmentUpdateManyMutationInput, BusAssignmentUncheckedUpdateManyWithoutRouteInput>
  }

  export type BusAssignmentScalarWhereInput = {
    AND?: BusAssignmentScalarWhereInput | BusAssignmentScalarWhereInput[]
    OR?: BusAssignmentScalarWhereInput[]
    NOT?: BusAssignmentScalarWhereInput | BusAssignmentScalarWhereInput[]
    BusAssignmentID?: StringFilter<"BusAssignment"> | string
    BusID?: StringFilter<"BusAssignment"> | string
    RouteID?: StringFilter<"BusAssignment"> | string
    AssignmentDate?: DateTimeFilter<"BusAssignment"> | Date | string
    Battery?: BoolFilter<"BusAssignment"> | boolean
    Lights?: BoolFilter<"BusAssignment"> | boolean
    Oil?: BoolFilter<"BusAssignment"> | boolean
    Water?: BoolFilter<"BusAssignment"> | boolean
    Break?: BoolFilter<"BusAssignment"> | boolean
    Air?: BoolFilter<"BusAssignment"> | boolean
    Gas?: BoolFilter<"BusAssignment"> | boolean
    Engine?: BoolFilter<"BusAssignment"> | boolean
    TireCondition?: BoolFilter<"BusAssignment"> | boolean
    Self_Driver?: BoolFilter<"BusAssignment"> | boolean
    Self_Conductor?: BoolFilter<"BusAssignment"> | boolean
    IsDeleted?: BoolFilter<"BusAssignment"> | boolean
    Status?: EnumBusOperationStatusFilter<"BusAssignment"> | $Enums.BusOperationStatus
  }

  export type RouteCreateWithoutRouteStopsInput = {
    RouteID: string
    RouteName: string
    IsDeleted: boolean
    StartStop: StopCreateNestedOneWithoutRoutesAsStartInput
    EndStop: StopCreateNestedOneWithoutRoutesAsEndInput
    BusAssignments?: BusAssignmentCreateNestedManyWithoutRouteInput
  }

  export type RouteUncheckedCreateWithoutRouteStopsInput = {
    RouteID: string
    StartStopID: string
    EndStopID: string
    RouteName: string
    IsDeleted: boolean
    BusAssignments?: BusAssignmentUncheckedCreateNestedManyWithoutRouteInput
  }

  export type RouteCreateOrConnectWithoutRouteStopsInput = {
    where: RouteWhereUniqueInput
    create: XOR<RouteCreateWithoutRouteStopsInput, RouteUncheckedCreateWithoutRouteStopsInput>
  }

  export type StopCreateWithoutRouteStopsInput = {
    StopID: string
    StopName: string
    latitude: string
    longitude: string
    IsDeleted: boolean
    routesAsStart?: RouteCreateNestedManyWithoutStartStopInput
    routesAsEnd?: RouteCreateNestedManyWithoutEndStopInput
  }

  export type StopUncheckedCreateWithoutRouteStopsInput = {
    StopID: string
    StopName: string
    latitude: string
    longitude: string
    IsDeleted: boolean
    routesAsStart?: RouteUncheckedCreateNestedManyWithoutStartStopInput
    routesAsEnd?: RouteUncheckedCreateNestedManyWithoutEndStopInput
  }

  export type StopCreateOrConnectWithoutRouteStopsInput = {
    where: StopWhereUniqueInput
    create: XOR<StopCreateWithoutRouteStopsInput, StopUncheckedCreateWithoutRouteStopsInput>
  }

  export type RouteUpsertWithoutRouteStopsInput = {
    update: XOR<RouteUpdateWithoutRouteStopsInput, RouteUncheckedUpdateWithoutRouteStopsInput>
    create: XOR<RouteCreateWithoutRouteStopsInput, RouteUncheckedCreateWithoutRouteStopsInput>
    where?: RouteWhereInput
  }

  export type RouteUpdateToOneWithWhereWithoutRouteStopsInput = {
    where?: RouteWhereInput
    data: XOR<RouteUpdateWithoutRouteStopsInput, RouteUncheckedUpdateWithoutRouteStopsInput>
  }

  export type RouteUpdateWithoutRouteStopsInput = {
    RouteID?: StringFieldUpdateOperationsInput | string
    RouteName?: StringFieldUpdateOperationsInput | string
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    StartStop?: StopUpdateOneRequiredWithoutRoutesAsStartNestedInput
    EndStop?: StopUpdateOneRequiredWithoutRoutesAsEndNestedInput
    BusAssignments?: BusAssignmentUpdateManyWithoutRouteNestedInput
  }

  export type RouteUncheckedUpdateWithoutRouteStopsInput = {
    RouteID?: StringFieldUpdateOperationsInput | string
    StartStopID?: StringFieldUpdateOperationsInput | string
    EndStopID?: StringFieldUpdateOperationsInput | string
    RouteName?: StringFieldUpdateOperationsInput | string
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    BusAssignments?: BusAssignmentUncheckedUpdateManyWithoutRouteNestedInput
  }

  export type StopUpsertWithoutRouteStopsInput = {
    update: XOR<StopUpdateWithoutRouteStopsInput, StopUncheckedUpdateWithoutRouteStopsInput>
    create: XOR<StopCreateWithoutRouteStopsInput, StopUncheckedCreateWithoutRouteStopsInput>
    where?: StopWhereInput
  }

  export type StopUpdateToOneWithWhereWithoutRouteStopsInput = {
    where?: StopWhereInput
    data: XOR<StopUpdateWithoutRouteStopsInput, StopUncheckedUpdateWithoutRouteStopsInput>
  }

  export type StopUpdateWithoutRouteStopsInput = {
    StopID?: StringFieldUpdateOperationsInput | string
    StopName?: StringFieldUpdateOperationsInput | string
    latitude?: StringFieldUpdateOperationsInput | string
    longitude?: StringFieldUpdateOperationsInput | string
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    routesAsStart?: RouteUpdateManyWithoutStartStopNestedInput
    routesAsEnd?: RouteUpdateManyWithoutEndStopNestedInput
  }

  export type StopUncheckedUpdateWithoutRouteStopsInput = {
    StopID?: StringFieldUpdateOperationsInput | string
    StopName?: StringFieldUpdateOperationsInput | string
    latitude?: StringFieldUpdateOperationsInput | string
    longitude?: StringFieldUpdateOperationsInput | string
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    routesAsStart?: RouteUncheckedUpdateManyWithoutStartStopNestedInput
    routesAsEnd?: RouteUncheckedUpdateManyWithoutEndStopNestedInput
  }

  export type RouteCreateWithoutBusAssignmentsInput = {
    RouteID: string
    RouteName: string
    IsDeleted: boolean
    StartStop: StopCreateNestedOneWithoutRoutesAsStartInput
    EndStop: StopCreateNestedOneWithoutRoutesAsEndInput
    RouteStops?: RouteStopCreateNestedManyWithoutRouteInput
  }

  export type RouteUncheckedCreateWithoutBusAssignmentsInput = {
    RouteID: string
    StartStopID: string
    EndStopID: string
    RouteName: string
    IsDeleted: boolean
    RouteStops?: RouteStopUncheckedCreateNestedManyWithoutRouteInput
  }

  export type RouteCreateOrConnectWithoutBusAssignmentsInput = {
    where: RouteWhereUniqueInput
    create: XOR<RouteCreateWithoutBusAssignmentsInput, RouteUncheckedCreateWithoutBusAssignmentsInput>
  }

  export type RegularBusAssignmentCreateWithoutBusAssignmentInput = {
    DriverID: string
    ConductorID: string
    Change: number
    TripRevenue: number
    quotaPolicy: Quota_PolicyCreateNestedOneWithoutRegularBusAssignmentsInput
  }

  export type RegularBusAssignmentUncheckedCreateWithoutBusAssignmentInput = {
    DriverID: string
    ConductorID: string
    QuotaPolicyID: string
    Change: number
    TripRevenue: number
  }

  export type RegularBusAssignmentCreateOrConnectWithoutBusAssignmentInput = {
    where: RegularBusAssignmentWhereUniqueInput
    create: XOR<RegularBusAssignmentCreateWithoutBusAssignmentInput, RegularBusAssignmentUncheckedCreateWithoutBusAssignmentInput>
  }

  export type RouteUpsertWithoutBusAssignmentsInput = {
    update: XOR<RouteUpdateWithoutBusAssignmentsInput, RouteUncheckedUpdateWithoutBusAssignmentsInput>
    create: XOR<RouteCreateWithoutBusAssignmentsInput, RouteUncheckedCreateWithoutBusAssignmentsInput>
    where?: RouteWhereInput
  }

  export type RouteUpdateToOneWithWhereWithoutBusAssignmentsInput = {
    where?: RouteWhereInput
    data: XOR<RouteUpdateWithoutBusAssignmentsInput, RouteUncheckedUpdateWithoutBusAssignmentsInput>
  }

  export type RouteUpdateWithoutBusAssignmentsInput = {
    RouteID?: StringFieldUpdateOperationsInput | string
    RouteName?: StringFieldUpdateOperationsInput | string
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    StartStop?: StopUpdateOneRequiredWithoutRoutesAsStartNestedInput
    EndStop?: StopUpdateOneRequiredWithoutRoutesAsEndNestedInput
    RouteStops?: RouteStopUpdateManyWithoutRouteNestedInput
  }

  export type RouteUncheckedUpdateWithoutBusAssignmentsInput = {
    RouteID?: StringFieldUpdateOperationsInput | string
    StartStopID?: StringFieldUpdateOperationsInput | string
    EndStopID?: StringFieldUpdateOperationsInput | string
    RouteName?: StringFieldUpdateOperationsInput | string
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    RouteStops?: RouteStopUncheckedUpdateManyWithoutRouteNestedInput
  }

  export type RegularBusAssignmentUpsertWithoutBusAssignmentInput = {
    update: XOR<RegularBusAssignmentUpdateWithoutBusAssignmentInput, RegularBusAssignmentUncheckedUpdateWithoutBusAssignmentInput>
    create: XOR<RegularBusAssignmentCreateWithoutBusAssignmentInput, RegularBusAssignmentUncheckedCreateWithoutBusAssignmentInput>
    where?: RegularBusAssignmentWhereInput
  }

  export type RegularBusAssignmentUpdateToOneWithWhereWithoutBusAssignmentInput = {
    where?: RegularBusAssignmentWhereInput
    data: XOR<RegularBusAssignmentUpdateWithoutBusAssignmentInput, RegularBusAssignmentUncheckedUpdateWithoutBusAssignmentInput>
  }

  export type RegularBusAssignmentUpdateWithoutBusAssignmentInput = {
    DriverID?: StringFieldUpdateOperationsInput | string
    ConductorID?: StringFieldUpdateOperationsInput | string
    Change?: FloatFieldUpdateOperationsInput | number
    TripRevenue?: FloatFieldUpdateOperationsInput | number
    quotaPolicy?: Quota_PolicyUpdateOneRequiredWithoutRegularBusAssignmentsNestedInput
  }

  export type RegularBusAssignmentUncheckedUpdateWithoutBusAssignmentInput = {
    DriverID?: StringFieldUpdateOperationsInput | string
    ConductorID?: StringFieldUpdateOperationsInput | string
    QuotaPolicyID?: StringFieldUpdateOperationsInput | string
    Change?: FloatFieldUpdateOperationsInput | number
    TripRevenue?: FloatFieldUpdateOperationsInput | number
  }

  export type Quota_PolicyCreateWithoutRegularBusAssignmentsInput = {
    QuotaPolicyID: string
    StartDate: Date | string
    EndDate: Date | string
    Fixed?: FixedCreateNestedOneWithoutQuotaPolicyInput
    Percentage?: PercentageCreateNestedOneWithoutQuotaPolicyInput
  }

  export type Quota_PolicyUncheckedCreateWithoutRegularBusAssignmentsInput = {
    QuotaPolicyID: string
    StartDate: Date | string
    EndDate: Date | string
    Fixed?: FixedUncheckedCreateNestedOneWithoutQuotaPolicyInput
    Percentage?: PercentageUncheckedCreateNestedOneWithoutQuotaPolicyInput
  }

  export type Quota_PolicyCreateOrConnectWithoutRegularBusAssignmentsInput = {
    where: Quota_PolicyWhereUniqueInput
    create: XOR<Quota_PolicyCreateWithoutRegularBusAssignmentsInput, Quota_PolicyUncheckedCreateWithoutRegularBusAssignmentsInput>
  }

  export type BusAssignmentCreateWithoutRegularBusAssignmentInput = {
    BusAssignmentID: string
    BusID: string
    AssignmentDate: Date | string
    Battery?: boolean
    Lights?: boolean
    Oil?: boolean
    Water?: boolean
    Break?: boolean
    Air?: boolean
    Gas?: boolean
    Engine?: boolean
    TireCondition?: boolean
    Self_Driver?: boolean
    Self_Conductor?: boolean
    IsDeleted?: boolean
    Status?: $Enums.BusOperationStatus
    Route: RouteCreateNestedOneWithoutBusAssignmentsInput
  }

  export type BusAssignmentUncheckedCreateWithoutRegularBusAssignmentInput = {
    BusAssignmentID: string
    BusID: string
    RouteID: string
    AssignmentDate: Date | string
    Battery?: boolean
    Lights?: boolean
    Oil?: boolean
    Water?: boolean
    Break?: boolean
    Air?: boolean
    Gas?: boolean
    Engine?: boolean
    TireCondition?: boolean
    Self_Driver?: boolean
    Self_Conductor?: boolean
    IsDeleted?: boolean
    Status?: $Enums.BusOperationStatus
  }

  export type BusAssignmentCreateOrConnectWithoutRegularBusAssignmentInput = {
    where: BusAssignmentWhereUniqueInput
    create: XOR<BusAssignmentCreateWithoutRegularBusAssignmentInput, BusAssignmentUncheckedCreateWithoutRegularBusAssignmentInput>
  }

  export type Quota_PolicyUpsertWithoutRegularBusAssignmentsInput = {
    update: XOR<Quota_PolicyUpdateWithoutRegularBusAssignmentsInput, Quota_PolicyUncheckedUpdateWithoutRegularBusAssignmentsInput>
    create: XOR<Quota_PolicyCreateWithoutRegularBusAssignmentsInput, Quota_PolicyUncheckedCreateWithoutRegularBusAssignmentsInput>
    where?: Quota_PolicyWhereInput
  }

  export type Quota_PolicyUpdateToOneWithWhereWithoutRegularBusAssignmentsInput = {
    where?: Quota_PolicyWhereInput
    data: XOR<Quota_PolicyUpdateWithoutRegularBusAssignmentsInput, Quota_PolicyUncheckedUpdateWithoutRegularBusAssignmentsInput>
  }

  export type Quota_PolicyUpdateWithoutRegularBusAssignmentsInput = {
    QuotaPolicyID?: StringFieldUpdateOperationsInput | string
    StartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    EndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    Fixed?: FixedUpdateOneWithoutQuotaPolicyNestedInput
    Percentage?: PercentageUpdateOneWithoutQuotaPolicyNestedInput
  }

  export type Quota_PolicyUncheckedUpdateWithoutRegularBusAssignmentsInput = {
    QuotaPolicyID?: StringFieldUpdateOperationsInput | string
    StartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    EndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    Fixed?: FixedUncheckedUpdateOneWithoutQuotaPolicyNestedInput
    Percentage?: PercentageUncheckedUpdateOneWithoutQuotaPolicyNestedInput
  }

  export type BusAssignmentUpsertWithoutRegularBusAssignmentInput = {
    update: XOR<BusAssignmentUpdateWithoutRegularBusAssignmentInput, BusAssignmentUncheckedUpdateWithoutRegularBusAssignmentInput>
    create: XOR<BusAssignmentCreateWithoutRegularBusAssignmentInput, BusAssignmentUncheckedCreateWithoutRegularBusAssignmentInput>
    where?: BusAssignmentWhereInput
  }

  export type BusAssignmentUpdateToOneWithWhereWithoutRegularBusAssignmentInput = {
    where?: BusAssignmentWhereInput
    data: XOR<BusAssignmentUpdateWithoutRegularBusAssignmentInput, BusAssignmentUncheckedUpdateWithoutRegularBusAssignmentInput>
  }

  export type BusAssignmentUpdateWithoutRegularBusAssignmentInput = {
    BusAssignmentID?: StringFieldUpdateOperationsInput | string
    BusID?: StringFieldUpdateOperationsInput | string
    AssignmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    Battery?: BoolFieldUpdateOperationsInput | boolean
    Lights?: BoolFieldUpdateOperationsInput | boolean
    Oil?: BoolFieldUpdateOperationsInput | boolean
    Water?: BoolFieldUpdateOperationsInput | boolean
    Break?: BoolFieldUpdateOperationsInput | boolean
    Air?: BoolFieldUpdateOperationsInput | boolean
    Gas?: BoolFieldUpdateOperationsInput | boolean
    Engine?: BoolFieldUpdateOperationsInput | boolean
    TireCondition?: BoolFieldUpdateOperationsInput | boolean
    Self_Driver?: BoolFieldUpdateOperationsInput | boolean
    Self_Conductor?: BoolFieldUpdateOperationsInput | boolean
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    Status?: EnumBusOperationStatusFieldUpdateOperationsInput | $Enums.BusOperationStatus
    Route?: RouteUpdateOneRequiredWithoutBusAssignmentsNestedInput
  }

  export type BusAssignmentUncheckedUpdateWithoutRegularBusAssignmentInput = {
    BusAssignmentID?: StringFieldUpdateOperationsInput | string
    BusID?: StringFieldUpdateOperationsInput | string
    RouteID?: StringFieldUpdateOperationsInput | string
    AssignmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    Battery?: BoolFieldUpdateOperationsInput | boolean
    Lights?: BoolFieldUpdateOperationsInput | boolean
    Oil?: BoolFieldUpdateOperationsInput | boolean
    Water?: BoolFieldUpdateOperationsInput | boolean
    Break?: BoolFieldUpdateOperationsInput | boolean
    Air?: BoolFieldUpdateOperationsInput | boolean
    Gas?: BoolFieldUpdateOperationsInput | boolean
    Engine?: BoolFieldUpdateOperationsInput | boolean
    TireCondition?: BoolFieldUpdateOperationsInput | boolean
    Self_Driver?: BoolFieldUpdateOperationsInput | boolean
    Self_Conductor?: BoolFieldUpdateOperationsInput | boolean
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    Status?: EnumBusOperationStatusFieldUpdateOperationsInput | $Enums.BusOperationStatus
  }

  export type RegularBusAssignmentCreateManyQuotaPolicyInput = {
    RegularBusAssignmentID: string
    DriverID: string
    ConductorID: string
    Change: number
    TripRevenue: number
  }

  export type RegularBusAssignmentUpdateWithoutQuotaPolicyInput = {
    DriverID?: StringFieldUpdateOperationsInput | string
    ConductorID?: StringFieldUpdateOperationsInput | string
    Change?: FloatFieldUpdateOperationsInput | number
    TripRevenue?: FloatFieldUpdateOperationsInput | number
    BusAssignment?: BusAssignmentUpdateOneRequiredWithoutRegularBusAssignmentNestedInput
  }

  export type RegularBusAssignmentUncheckedUpdateWithoutQuotaPolicyInput = {
    RegularBusAssignmentID?: StringFieldUpdateOperationsInput | string
    DriverID?: StringFieldUpdateOperationsInput | string
    ConductorID?: StringFieldUpdateOperationsInput | string
    Change?: FloatFieldUpdateOperationsInput | number
    TripRevenue?: FloatFieldUpdateOperationsInput | number
  }

  export type RegularBusAssignmentUncheckedUpdateManyWithoutQuotaPolicyInput = {
    RegularBusAssignmentID?: StringFieldUpdateOperationsInput | string
    DriverID?: StringFieldUpdateOperationsInput | string
    ConductorID?: StringFieldUpdateOperationsInput | string
    Change?: FloatFieldUpdateOperationsInput | number
    TripRevenue?: FloatFieldUpdateOperationsInput | number
  }

  export type RouteCreateManyStartStopInput = {
    RouteID: string
    EndStopID: string
    RouteName: string
    IsDeleted: boolean
  }

  export type RouteCreateManyEndStopInput = {
    RouteID: string
    StartStopID: string
    RouteName: string
    IsDeleted: boolean
  }

  export type RouteStopCreateManyStopInput = {
    RouteStopID: string
    RouteID: string
    StopOrder: number
  }

  export type RouteUpdateWithoutStartStopInput = {
    RouteID?: StringFieldUpdateOperationsInput | string
    RouteName?: StringFieldUpdateOperationsInput | string
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    EndStop?: StopUpdateOneRequiredWithoutRoutesAsEndNestedInput
    RouteStops?: RouteStopUpdateManyWithoutRouteNestedInput
    BusAssignments?: BusAssignmentUpdateManyWithoutRouteNestedInput
  }

  export type RouteUncheckedUpdateWithoutStartStopInput = {
    RouteID?: StringFieldUpdateOperationsInput | string
    EndStopID?: StringFieldUpdateOperationsInput | string
    RouteName?: StringFieldUpdateOperationsInput | string
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    RouteStops?: RouteStopUncheckedUpdateManyWithoutRouteNestedInput
    BusAssignments?: BusAssignmentUncheckedUpdateManyWithoutRouteNestedInput
  }

  export type RouteUncheckedUpdateManyWithoutStartStopInput = {
    RouteID?: StringFieldUpdateOperationsInput | string
    EndStopID?: StringFieldUpdateOperationsInput | string
    RouteName?: StringFieldUpdateOperationsInput | string
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RouteUpdateWithoutEndStopInput = {
    RouteID?: StringFieldUpdateOperationsInput | string
    RouteName?: StringFieldUpdateOperationsInput | string
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    StartStop?: StopUpdateOneRequiredWithoutRoutesAsStartNestedInput
    RouteStops?: RouteStopUpdateManyWithoutRouteNestedInput
    BusAssignments?: BusAssignmentUpdateManyWithoutRouteNestedInput
  }

  export type RouteUncheckedUpdateWithoutEndStopInput = {
    RouteID?: StringFieldUpdateOperationsInput | string
    StartStopID?: StringFieldUpdateOperationsInput | string
    RouteName?: StringFieldUpdateOperationsInput | string
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    RouteStops?: RouteStopUncheckedUpdateManyWithoutRouteNestedInput
    BusAssignments?: BusAssignmentUncheckedUpdateManyWithoutRouteNestedInput
  }

  export type RouteUncheckedUpdateManyWithoutEndStopInput = {
    RouteID?: StringFieldUpdateOperationsInput | string
    StartStopID?: StringFieldUpdateOperationsInput | string
    RouteName?: StringFieldUpdateOperationsInput | string
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RouteStopUpdateWithoutStopInput = {
    RouteStopID?: StringFieldUpdateOperationsInput | string
    StopOrder?: IntFieldUpdateOperationsInput | number
    Route?: RouteUpdateOneRequiredWithoutRouteStopsNestedInput
  }

  export type RouteStopUncheckedUpdateWithoutStopInput = {
    RouteStopID?: StringFieldUpdateOperationsInput | string
    RouteID?: StringFieldUpdateOperationsInput | string
    StopOrder?: IntFieldUpdateOperationsInput | number
  }

  export type RouteStopUncheckedUpdateManyWithoutStopInput = {
    RouteStopID?: StringFieldUpdateOperationsInput | string
    RouteID?: StringFieldUpdateOperationsInput | string
    StopOrder?: IntFieldUpdateOperationsInput | number
  }

  export type RouteStopCreateManyRouteInput = {
    RouteStopID: string
    StopID: string
    StopOrder: number
  }

  export type BusAssignmentCreateManyRouteInput = {
    BusAssignmentID: string
    BusID: string
    AssignmentDate: Date | string
    Battery?: boolean
    Lights?: boolean
    Oil?: boolean
    Water?: boolean
    Break?: boolean
    Air?: boolean
    Gas?: boolean
    Engine?: boolean
    TireCondition?: boolean
    Self_Driver?: boolean
    Self_Conductor?: boolean
    IsDeleted?: boolean
    Status?: $Enums.BusOperationStatus
  }

  export type RouteStopUpdateWithoutRouteInput = {
    RouteStopID?: StringFieldUpdateOperationsInput | string
    StopOrder?: IntFieldUpdateOperationsInput | number
    Stop?: StopUpdateOneRequiredWithoutRouteStopsNestedInput
  }

  export type RouteStopUncheckedUpdateWithoutRouteInput = {
    RouteStopID?: StringFieldUpdateOperationsInput | string
    StopID?: StringFieldUpdateOperationsInput | string
    StopOrder?: IntFieldUpdateOperationsInput | number
  }

  export type RouteStopUncheckedUpdateManyWithoutRouteInput = {
    RouteStopID?: StringFieldUpdateOperationsInput | string
    StopID?: StringFieldUpdateOperationsInput | string
    StopOrder?: IntFieldUpdateOperationsInput | number
  }

  export type BusAssignmentUpdateWithoutRouteInput = {
    BusAssignmentID?: StringFieldUpdateOperationsInput | string
    BusID?: StringFieldUpdateOperationsInput | string
    AssignmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    Battery?: BoolFieldUpdateOperationsInput | boolean
    Lights?: BoolFieldUpdateOperationsInput | boolean
    Oil?: BoolFieldUpdateOperationsInput | boolean
    Water?: BoolFieldUpdateOperationsInput | boolean
    Break?: BoolFieldUpdateOperationsInput | boolean
    Air?: BoolFieldUpdateOperationsInput | boolean
    Gas?: BoolFieldUpdateOperationsInput | boolean
    Engine?: BoolFieldUpdateOperationsInput | boolean
    TireCondition?: BoolFieldUpdateOperationsInput | boolean
    Self_Driver?: BoolFieldUpdateOperationsInput | boolean
    Self_Conductor?: BoolFieldUpdateOperationsInput | boolean
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    Status?: EnumBusOperationStatusFieldUpdateOperationsInput | $Enums.BusOperationStatus
    RegularBusAssignment?: RegularBusAssignmentUpdateOneWithoutBusAssignmentNestedInput
  }

  export type BusAssignmentUncheckedUpdateWithoutRouteInput = {
    BusAssignmentID?: StringFieldUpdateOperationsInput | string
    BusID?: StringFieldUpdateOperationsInput | string
    AssignmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    Battery?: BoolFieldUpdateOperationsInput | boolean
    Lights?: BoolFieldUpdateOperationsInput | boolean
    Oil?: BoolFieldUpdateOperationsInput | boolean
    Water?: BoolFieldUpdateOperationsInput | boolean
    Break?: BoolFieldUpdateOperationsInput | boolean
    Air?: BoolFieldUpdateOperationsInput | boolean
    Gas?: BoolFieldUpdateOperationsInput | boolean
    Engine?: BoolFieldUpdateOperationsInput | boolean
    TireCondition?: BoolFieldUpdateOperationsInput | boolean
    Self_Driver?: BoolFieldUpdateOperationsInput | boolean
    Self_Conductor?: BoolFieldUpdateOperationsInput | boolean
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    Status?: EnumBusOperationStatusFieldUpdateOperationsInput | $Enums.BusOperationStatus
    RegularBusAssignment?: RegularBusAssignmentUncheckedUpdateOneWithoutBusAssignmentNestedInput
  }

  export type BusAssignmentUncheckedUpdateManyWithoutRouteInput = {
    BusAssignmentID?: StringFieldUpdateOperationsInput | string
    BusID?: StringFieldUpdateOperationsInput | string
    AssignmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    Battery?: BoolFieldUpdateOperationsInput | boolean
    Lights?: BoolFieldUpdateOperationsInput | boolean
    Oil?: BoolFieldUpdateOperationsInput | boolean
    Water?: BoolFieldUpdateOperationsInput | boolean
    Break?: BoolFieldUpdateOperationsInput | boolean
    Air?: BoolFieldUpdateOperationsInput | boolean
    Gas?: BoolFieldUpdateOperationsInput | boolean
    Engine?: BoolFieldUpdateOperationsInput | boolean
    TireCondition?: BoolFieldUpdateOperationsInput | boolean
    Self_Driver?: BoolFieldUpdateOperationsInput | boolean
    Self_Conductor?: BoolFieldUpdateOperationsInput | boolean
    IsDeleted?: BoolFieldUpdateOperationsInput | boolean
    Status?: EnumBusOperationStatusFieldUpdateOperationsInput | $Enums.BusOperationStatus
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}