Public Class NNPlanilla
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarPlanilla(ByVal p_TIPO As String, ByVal p_CTLG_CODE As String, ByVal p_PERIODO_ANO As String, ByVal P_MES As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_PLANILLA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERIODO_ANO", p_PERIODO_ANO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MES", P_MES, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarBoleta(ByVal p_CTLG_CODE As String, p_MES As String, p_ANIO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_BOLETAS_EMPLEADO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Crear_Conceptos_planilla(ByVal p_GRUP_DESC As String, ByVal p_DEPEND_CODE As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String, ByVal p_CODE_PLAN As String, ByVal p_ABREVIATRUA As String, ByVal p_IND_ING_EGR As String, ByVal p_IND_NO_ADICIONAL As String) As Array

        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_CREAR_CONCEPTOS_PLANILLA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_DESC", p_GRUP_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DEPEND_CODE", p_DEPEND_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_PLAN", p_CODE_PLAN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ABREVIATRUA", p_ABREVIATRUA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_ING_EGR", p_IND_ING_EGR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_NO_ADICIONAL", p_IND_NO_ADICIONAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_GRUP_CODE_GENERADO").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Actualizar_Conceptos_planilla(ByVal p_CODE As String, ByVal p_DESC As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String, ByVal p_CODE_PLAME As String, ByVal p_ABREVIATRUA As String, ByVal p_IND_ING_EGR As String, ByVal p_IND_NO_ADICIONAL As String) As Array

        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_CONCEPTOS_PLANILLA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_PLAME", p_CODE_PLAME, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ABREVIATRUA", p_ABREVIATRUA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_ING_EGR", p_IND_ING_EGR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_NO_ADICIONAL", p_IND_NO_ADICIONAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_SALIDA").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Listar_Conceptos_Planilla(ByVal p_GRUP_CODE As String, ByVal p_TIPO As String, ByVal p_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_CONCEPTOS_PLANILLA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



    Public Function Crear_Asig_Concepto_Emple(ByVal p_EMPLEADOS As String, ByVal p_IND_TODOS As String, ByVal p_CONCEPTO_CODE As String, ByVal p_MONTO As Decimal, ByVal p_FECHA_INICIO As String, ByVal p_FECHA_FIN As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_USUA_ID As String, ByVal p_ESTADO As String, p_TIPLA As String) As String

        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFC_ASIGNAR_CONCEPTO_PLANILLA_EMPLEADO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_EMPLEADOS", p_EMPLEADOS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_TODOS", p_IND_TODOS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONCEPTO_CODE", p_CONCEPTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", p_FECHA_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", p_FECHA_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPLA", p_TIPLA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_RESP").Value.ToString()
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Asig_Concep_Emple(ByVal p_CONCEPTO_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_ESTADO As String, ByVal p_CODE_ASIGNACION As Integer, ByVal p_TIPLA_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_ASIG_CON_EMPLEADO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONCEPTO_CODE", p_CONCEPTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_ASIGNACION", p_CODE_ASIGNACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPLA_CODE", p_TIPLA_CODE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Actualizar_Asig_Concepto_Emple(ByVal p_CONCEPTO_CODE As String, ByVal p_CODE_ASIGNACION As Integer, ByVal p_PIDM_EMPL As String, ByVal p_FECHA_FIN As String, ByVal p_FECHA_INICIO As String, ByVal p_MONTO As Decimal, ByVal p_ESTADO As String, ByVal p_USUA_ID As String, ByVal p_TIPO_UPDATE As String) As Array

        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_ASIGNACION_CONCEPTO_EMPLEADO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONCEPTO_CODE", p_CONCEPTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_ASIGNACION", p_CODE_ASIGNACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_EMPL", p_PIDM_EMPL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", p_FECHA_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", p_FECHA_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_UPDATE", p_TIPO_UPDATE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_R_ESTADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_RESP").Value
            msg(1) = cmd1.Parameters("@p_R_ESTADO").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Crear_Grupo_Tributos_Laborales(ByVal p_GRUP_DESC As String, ByVal p_DEPEND_CODE As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String) As Array

        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_CREAR_GRUPO_TRIBUTO_LABORAL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_DESC", p_GRUP_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DEPEND_CODE", p_DEPEND_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_GRUP_CODE_GENERADO").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Listar_Grupo_Tributos_Laborales(ByVal p_GRUP_CODE As String, ByVal p_TIPO As String, ByVal p_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_GRUPO_TRIBUTO_LABORAL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Actualizar_Grupo_Tributos_Laborales(ByVal p_CODE As String, ByVal p_DESC As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String) As Array

        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFS_ACTUALIZAR_GRUPO_TRIBUTO_LABORAL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_SALIDA").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



    Public Function Crear_Beneficios_sociales(ByVal p_DESCRIPCION As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String) As Array

        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFC_CREAR_BENEFICIOS_SOCIALES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_CODE_GENERADO").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Actualizar_Beneficios_sociales(ByVal p_CODE As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String, ByVal p_DESCRIPCION As String, ByVal p_TIPO_UPDATE As String) As Array

        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_BENEFICIOS_SOCIALES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_UPDATE", p_TIPO_UPDATE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_SALIDA").Value
            msg(1) = cmd1.Parameters("@p_ESTADO").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Beneficios_sociales(ByVal p_CODE As String, ByVal p_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_BENEFICIOS_SOCIALES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



    Public Function Crear_REL_CONPPL_TRILAB(ByVal p_CODE_RHCNPL As String, ByVal p_CODE_RHTRLAB As String, ByVal p_USUA_ID As String) As Array

        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_CREAR_REL_TRIBUTOS_PLANILLA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_RHCNPL", p_CODE_RHCNPL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_RHTRLAB", p_CODE_RHTRLAB, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_RESP").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Listar_Rel_Conpl_Trilab() As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_REL_TRIBUTOS_PLANILLA", CommandType.StoredProcedure)



            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Crear_REL_CONPPL_BENEFICIO(ByVal p_CODE_RHCNPL As String, ByVal p_CODE_RHBENSO As String, ByVal p_USUA_ID As String) As Array

        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_CREAR_REL_BENEFICIOS_PLANILLA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_RHCNPL", p_CODE_RHCNPL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_RHBENSO", p_CODE_RHBENSO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_RESP").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Rel_Conpl_Beneficio() As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_REL_BENEFICIOS_PLANILLA", CommandType.StoredProcedure)



            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Tipo_Planilla(p_CODE As String, p_ESTADO_IND As String, p_TIPO_PAGO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_TIPO_PLANILLA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_PAGO", p_TIPO_PAGO, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Actualiza_Estado_TipoPla(p_CODE As String, p_USUA_ID As String) As Array
        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CAMBIAR_ESTADO_TIPOPLANI", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_PeriodicidadPago(ByVal p_CODE As String, ByVal p_CODE_SUNAT As String, ByVal p_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_PERIODICIDAD_PAGO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_SUNAT", p_CODE_SUNAT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function CreaTipoPlanilla(p_DESC As String, p_ESTADO_IND As String, p_USUA_ID As String, p_PAGO_IND As String,
                                     p_PEPA_CODE As String, p_TEXT As String, p_BOLE_IND As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_TIPO_PLANILLA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAGO_IND", p_PAGO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEPA_CODE", p_PEPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TEXT", p_TEXT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BOLE_IND", p_BOLE_IND, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_GENERADO").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function ActualizaTipoPlanilla(p_CODE As String, p_DESC As String, p_ESTADO_IND As String, p_USUA_ID As String, p_PAGO_IND As String,
                                          p_PEPA_CODE As String, p_TEXT As String, p_BOLE_IND As String) As String
        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_TIPO_PLANILLA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAGO_IND", p_PAGO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEPA_CODE", p_PEPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TEXT", p_TEXT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BOLE_IND", p_BOLE_IND, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_GENERADO").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Mes_TipoPla(p_TIPLA_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTA_MES_TIPOPLA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPLA_CODE", p_TIPLA_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_ConceptoAdicionalxTipoPlanilla(p_TIPLA_CODE As String, p_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_CONCEPTO_ADICIONAL_X_PLANILLA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPLA_CODE", p_TIPLA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Listar_ConceptoxTipoPlanilla(p_LISTA_IND As String, p_TIPLA_CODE As String, p_DEPEND_CODE As String,
                                                 Optional p_RHCNPL_IND_NO_ADICIONAL As String = "SI") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTA_CONCEPTOS_X_TIPO_PLANI", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_LISTA_IND", p_LISTA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPLA_CODE", p_TIPLA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DEPEND_CODE", p_DEPEND_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHCNPL_IND_NO_ADICIONAL", p_RHCNPL_IND_NO_ADICIONAL, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Lista_Datos_Comisiones_AFP_Planilla(p_CTLG_CODE As String, p_PERIODO As String, p_COD_AFP As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_DATOS_COMISIONES_PLANILLA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERIODO", p_PERIODO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AFP", p_COD_AFP, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



    Public Function Crear_ConceptosxTipoPla(p_TIPLA_CODE As String, p_CONCEP_CODE As String, p_ESTADO_IND As String, p_USUA_ID As String, p_GRUPO As String) As Array

        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_CREA_CONCEPTOS_X_TIPOPL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPLA_CODE", p_TIPLA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONCEP_CODE", p_CONCEP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO", p_GRUPO, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_GENERADO").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



    Public Function CreaPeriodoSinRemuneracion(p_CTLG_CODE As String, p_ESTADO As String,
                                                p_FECHA_INI As String, p_FECHA_FIN As String,
                                                p_GLOSA As String, p_MOTIVO As String,
                                                p_PIDM As String, p_USUA_ID As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_PERIODO_SIN_REMUNERACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INI", Convert.ToDateTime(p_FECHA_INI).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", Convert.ToDateTime(p_FECHA_FIN).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GLOSA", p_GLOSA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOTIVO", p_MOTIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@RESP", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@RESP").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarPeriodoSinRemuneracion(p_CTLG_CODE As String, p_ESTADO As String,
                                             p_FECHA_INI As String, p_FECHA_FIN As String,
                                             p_GLOSA As String, p_MOTIVO As String,
                                             p_PIDM As String, p_USUA_ID As String, p_CODIGO As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_PERIODO_SIN_REMUNERACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INI", Convert.ToDateTime(p_FECHA_INI).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", Convert.ToDateTime(p_FECHA_FIN).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GLOSA", p_GLOSA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOTIVO", p_MOTIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@RESP", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@RESP").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Listar_Periodo_Sin_Remuneracion(P_CTLG_CODE As String, p_MOTIVO As String, p_CODIGO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_PERIODO_SIN_REMUNERACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOTIVO", p_MOTIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Elimina_ConceptosxTipoPla(p_TIPLA_CODE As String, p_CONCEP_CODE As String, p_GRUPO As String) As Array
        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_ELIMINA_CONCEPTOS_X_TIPOPL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPLA_CODE", p_TIPLA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONCEP_CODE", p_CONCEP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO", p_GRUPO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_RESULTADO", 0, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)

            msg(0) = cmd.Parameters("@p_RESULTADO").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizaPosicion_CxTPL(p_ACCION_IND As String, p_CONCEP_CODE As String, p_NRO_ORDEN As String, p_TIPLA_CODE As String, p_GRUPO As String) As Array
        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_ACTUALIZA_POSICION_CONCPT_X_TIPOPL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ACCION_IND", p_ACCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONCEP_CODE", p_CONCEP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_ORDEN", p_NRO_ORDEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPLA_CODE", p_TIPLA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO", p_GRUPO, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Verifica_Cod_Usu_Biometrico(p_DNI As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PPP_VERIFICA_EMPLEADO_BIOMETRICO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_DNI", p_DNI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_RESP").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Actualiza_Estado_Concepto_Tipla(p_TIPLA_CODE As String, p_CONCEP_CODE As String, p_GRUPO As String, p_USUA_ID As String, p_ACTIVO As String) As Array
        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_ACTUALIZA_ESTADO_CONCEPTO_TIPLA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPLA_CODE", p_TIPLA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO", p_GRUPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONCEP_CODE", p_CONCEP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ACTIVO", p_ACTIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)

            msg(0) = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Empleados_Regularizar_horas(p_CTLG_CODE As String, p_SCSL_CODE As String, p_FECHA_DESDE As String, p_FECHA_HASTA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_EMPLEADOS_REGULARIZAR_HORAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_DESDE", IIf(p_FECHA_DESDE Is Nothing, Nothing, p_FECHA_DESDE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_HASTA", IIf(p_FECHA_HASTA Is Nothing, Nothing, p_FECHA_HASTA), ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Horas_X_Regularizar_Empleado(p_PIDM As String, p_FECHA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_HORAS_EMPLEADO_REGULARIZAR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", p_FECHA, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Marcaciones_Biometricos_reales(p_PIDM As String, p_FECHA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_MARACIONES_BIOMETRICO_REALES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", p_FECHA, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Actualizar_Horas_Regularizacion(p_PIDM As String, p_DETALLE As String,
                                         p_FECHA As String, p_IDS As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_HORAS_REGULARIZAR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", p_DETALLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", p_FECHA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IDS", p_IDS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_RESP").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Listar_Horas_Regularizadas_Sin_Procesar(Optional ByVal p_CTLG_CODE As String = "",
                                                                  Optional ByVal p_SCSL_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_HORAS_REGULARIZADAS_SIN_PROCESAR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Calcula_Asistencias(p_AUTOMATICO As String, p_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_CALCULA_ASISTENCIAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_AUTOMATICO", p_AUTOMATICO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Marcaciones(p_FECHA_DESDE As String, p_FECHA_HASTA As String, p_ESTADO_IND As String, p_PIDM As String, p_SCSL_CODE As String, p_CTL_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_MARCACIONES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_DESDE", Convert.ToDateTime(p_FECHA_DESDE).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_HASTA", Convert.ToDateTime(p_FECHA_HASTA).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTL_CODE", p_CTL_CODE, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Listar_Fechas_No_Procesadas_Biometrico(p_ANHO As String, p_MES As String, p_CTLG_CODE As String, p_SCSL_CODE As String,
                                                            p_TIPO As String, p_CAD_PIDM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_FECHAS_NO_PROCESADAS_BIOMETRICO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANHO", p_ANHO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAD_PIDM", p_CAD_PIDM, ParameterDirection.Input, 253))



            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Crea_Marcadas_Biometrico(p_FECHA As String, p_CTLG_CODE As String) As String
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable
            Dim msg As String

            cmd = cn.GetNewCommand("PFS_CREA_MARCADAS_BIOMETRICO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_HOY", Convert.ToDateTime(p_FECHA).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                msg = dt(0)("MENSAJE").ToString()
                Return msg
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try

    End Function


    Public Function Evalua_Marcaciones_Biometrico(p_FECHA As String, p_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_EVALUA_MARACACIONES_BIOMETRICO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_HOY", Convert.ToDateTime(p_FECHA).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Ejecuta_job_faltas(p_FECHA As String, p_CTLG_CODE As String) As String
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_JOB_INSERTA_FALTAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_HOY", Convert.ToDateTime(p_FECHA).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)

            Return "OK"

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Listar_Horario_Detalle_X_Dia(p_FECHA As String, p_PIDM As String, p_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_HORARIO_DETALLE_EMPLEADO_X_DIA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", p_FECHA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))



            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Reprocesa_Marcadas_Biometrico(p_FECHA As String, p_CTLG_CODE As String, p_SCSL_CODE As String) As String
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable
            Dim msg As String

            cmd = cn.GetNewCommand("PFS_REPROCESAR_MARCACIONES_BIOMETRICO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", p_FECHA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))



            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                msg = dt(0)("MENSAJE").ToString()
                Return msg
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try

    End Function



    Public Function Listar_calculo_Tardanzas(p_ANHO As String, p_MES As String, p_PIDM As String, p_CTLG_CODE As String, p_SCSL_CODE As String, Optional p_TIPO As String = "1") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_CALCULA_TARDANZAS_EMPLEADO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANHO", p_ANHO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))



            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Listar_calculo_horas_extras(p_ANHO As String, p_MES As String, p_PIDM As String, p_CTLG_CODE As String, p_SCSL_CODE As String, Optional p_TIPO As String = "1") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_CALCULA_HORAS_EXTRAS_EMPLEADO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANHO", p_ANHO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_dias_laborados_x_empleado(p_FECHA_DESDE As String, p_FECHA_HASTA As String, p_PIDM As String, p_CTLG_CODE As String) As String
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_DIAS_LABORADOS_X_EMPLEADO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_DESDE", p_FECHA_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_HASTA", p_FECHA_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt(0)("NUM_DIAS_LABORAR").ToString
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Listar_periodo_corte_x_ctlg(p_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_PERIODO_CORTE_X_CLTG", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Listar_Justificaciones_x_Periodo(p_FECHA_INI As String, p_FECHA_FIN As String, p_TIPO_JUSTIFICACION As String, p_PIDM As String, p_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFR_LISTAR_JUSTIFICACIONES_X_PERIODO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INI", p_FECHA_INI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", p_FECHA_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_JUSTIFICACION", p_TIPO_JUSTIFICACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))



            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Refrigerio_Detalle_X_Dia(p_FECHA_INICIO As String, p_FECHA_FIN As String, p_PIDM As String, TIPO As String, p_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_REFRIGERIO_DETALLE_EMPLEADO_X_DIA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", p_FECHA_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", p_FECHA_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@TIPO", TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Empleado_Reporte_Fatar(p_CTLG_CODE As String, p_SCSL_CODE As String, p_ANHO As String, p_MES As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_EMPLEADO_REPORTE_FATAR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANHO", p_ANHO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Listar_Faltas_Empleado(p_ANHO As String, p_MES As String, p_PIDM As String, p_CTLG_CODE As String,
                                           p_SCSL_CODE As String, p_TIPO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_CALCULA_FALTAS_EMPLEADO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANHO", p_ANHO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))



            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Verifica_marcaciones_no_regularizadas(p_ANHO As String, p_MES As String, p_CTLG_CODE As String, p_SCSL_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_VERIFICA_MARCACIONES_REGULARIZADAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANHO", p_ANHO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))



            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function




    Public Function Genera_valorizado_fa_tar_ex(p_ANIO As String, p_MES As String, p_DETALLE As String) As String

        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_CREAR_FALTAS_TARDANZAS_VALORIZADAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", p_DETALLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", Int(p_ANIO), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", Int(p_MES), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = cmd.Parameters("@p_SALIDA").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Listar_Marcaciones_Brutas(p_FECHA_DESDE As String, p_FECHA_HASTA As String, p_ESTADO_IND As String, p_PIDM As String, p_SCSL_CODE As String, p_CTL_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_MARCACIONES_BRUTAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_DESDE", p_FECHA_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_HASTA", p_FECHA_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTL_CODE", p_CTL_CODE, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Listar_Datos_Basicos_Planilla(p_CTLG_CODE As String, p_SCSL_CODE As String, p_MES As String, p_ANIO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_DATOS_BASICOS_PLANILLA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Listar_Datos_Valorizados_Fatar(p_CTLG_CODE As String, p_SCSL_CODE As String,
                                                    p_MES As String, p_ANIO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_DATOS_VALORIZADO_FATAR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Carga_Datos_Para_Planilla(p_CTLG_CODE As String, p_SCSL_CODE As String,
                                                  p_MES As String, p_ANIO As String,
                                                  p_TIPO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_CARGA_DATOS_PARA_PLANILLA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function




    Public Function Verifica_Generacion_Planilla(p_CTLG_CODE As String,
                                                  p_MES As String, p_ANIO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_VERIFICAR_GENERACION_PLANILLA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Crea_cabecera_detalle_planilla(p_DETALLE As String, p_CABECERA As String,
                                                    p_ANIO As String, p_MES As String,
                                                    p_CTLG_CODE As String,
                                                    p_USUA_ID As String) As String

        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_CREAR_CABEZERA_PLANILLA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CABECERA", p_CABECERA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", p_DETALLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))


            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = cmd.Parameters("@p_RESP").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function




    Public Function Cerrar_Planilla(p_CTLG_CODE As String, p_MES As String, p_ANIO As String, p_USUA_ID As String) As String

        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_CERRAR_PLANILLA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))



            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = cmd.Parameters("@p_RESP").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



    Public Function Lista_Planillas_Cerradas(p_CTLG_CODE As String,
                                                p_TIPO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_PLANILLAS_CIERRE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))



            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



    Public Function Lista_Detalle_Planilla(p_CTLG_CODE As String, p_MES As String, p_ANIO As String, p_PIDM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_DETALLE_PLANILLA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))



            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function




    Public Function Lista_Cabecera_Planilla(p_CTLG_CODE As String, p_MES As String, p_ANIO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            'S
            cmd = cn.GetNewCommand("PCS_LISTAR_CABECERA_PLANILLA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))




            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Lista_Carga_Data_Boleta(p_CTLG_CODE As String, p_MES As String, p_ANIO As String, p_TIPO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_CARGA_DATA_BOLETA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))



            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



    Public Function Generar_Planilla_Afp(p_CODIGO_PLANILLA As String, p_USUA_ID As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_PLANILLA_AFP", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_PLANILLA", p_CODIGO_PLANILLA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))




            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function





    Public Function Lista_Planillas_Afp_Generadas(p_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_PLANILLAS_GENERADAS_AFP", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))




            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function




    Public Function Lista_Cabecera_planillas_afp(p_CTLG_CODE As String, p_ANIO As String, p_MES As String,
                                                  p_ESTADO_IND As String, p_COD_AFP_SUNAT As String, p_COD_PLANI_REF As String,
                                                  Optional p_CODIGO As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_CABECERA_PLANILLAS_AFP", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AFP_SUNAT", p_COD_AFP_SUNAT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_PLANI_REF", p_COD_PLANI_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))




            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Lista_Detalle_planillas_afp(p_CODIGO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_DETALLE_PLANILLAS_AFP", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))




            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Presenta_Planilla_Afp(p_CODIGO As String, p_NUM_PLANILLA As String, p_FEC_PRESENTACION As String, p_USUA_ID As String) As String

        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_PRESENTAR_PLANILLAS_AFP", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_PLANILLA", p_NUM_PLANILLA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FEC_PRESENTACION", p_FEC_PRESENTACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))



            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = cmd.Parameters("@p_RESP").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Carga_Data_Ecxel_afpnet(p_CODE_PLANILLA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_CARGA_DATA_EXCEL_AFPNET", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_PLANILLA", p_CODE_PLANILLA, ParameterDirection.Input, 253))




            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Lista_Datos_Cts(p_CTLG_CODE As String, p_MES As String, p_ANIO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_DATOS_CTS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))




            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Lista_Datos_Gratificacion(p_CTLG_CODE As String, p_MES As String, p_ANIO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_DATOS_GRATIFICACIONES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))




            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Lista_valores_concep_variables_Grati(p_CTLG_CODE As String, p_MES As String, p_ANIO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_VALORES_CONCEPTOS_GRATIFICACIONES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))




            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



    Public Function Listar_Monto_Conceptos_Adicionales_planilla(p_ANIO As String, p_MES As String, p_CTLG_CODE As String, p_TIPO_PLANI As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_MONTO_CONCEPTOS_ADICIONALES_PLANILLA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_PLANI", p_TIPO_PLANI, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Elimina_asigancion_concep_empl(ByVal p_DETALLE As String) As String

        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_ELIMINA_ASIG_CONCEP_PLANILLA_EMPL_BLOQUE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", p_DETALLE, ParameterDirection.Input, 253))




            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = cmd.Parameters("@p_RESP").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Get_Estado_Planilla(p_CTLG_CODE As String, p_MES As Integer, p_ANIO As Integer) As DataTable
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_GET_ESTADO_PLANILLA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


End Class


