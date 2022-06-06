Public Class NFPeriodo
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function Listar_Periodo(ByVal p_ESTADO As String, ByVal p_ANO As String, p_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_PERIODO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_EST_IND", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANO", p_ANO, ParameterDirection.Input, 253))
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

    Public Function Crear_Periodo() As String

        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFC_CREAR_PERIODO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_mensaje", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_mensaje").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarCoeficientePeriodo(ByVal p_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_COEFICIENTE As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_COEFICIENTE_PERIODO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COEFICIENTE", p_COEFICIENTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPUESTA", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_RESPUESTA").Value
            Return msg

        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
    Public Function Actualizar_Periodo(p_CODE As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_PERIODO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_ESTADO").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Devuelve_Fecha_Declaracion_Tributaria(p_mes As String, p_ctlg As String, p_anio As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_DEVUELVE_FECHA_DECLARACION_TRIBUTARIA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_mes", p_mes, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ctlg", p_ctlg, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_anio", p_anio, ParameterDirection.Input, 253))


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


    Public Function Cerrar_Periodo(p_mes As String, p_ctlg As String, p_anio As String,
                                    p_fec_cierre As String, p_fec_declara As String,
                                    p_usua_id As String, p_COEFICIENTE As String) As String

        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFS_CIERRE_PERIODO_TRIBUTARIO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_mes", p_mes, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ctlg", p_ctlg, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_anio", p_anio, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_fec_cierre", p_fec_cierre, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_fec_declara", p_fec_declara, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_usua_id", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COEFICIENTE", p_COEFICIENTE, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_SALIDA").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Listar_Periodo_Cerrados_para_reapertura(p_ctlg As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTA_PERIODOS_TRIBUTARIOS_PARA_REAPERTURA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ctlg", p_ctlg, ParameterDirection.Input, 253))
           


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


    Public Function Reaperturar_Periodo(p_mes As String, p_ctlg As String, p_anio As String,
                                p_fec_reapertura As String,
                                p_usua_id As String) As String

        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFS_REAPERTURAR_PERIODO_TRIBUTARIO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_mes", p_mes, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ctlg", p_ctlg, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_anio", p_anio, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_fec_reapertura", p_fec_reapertura, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_usua_id", p_usua_id, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_SALIDA").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Abrir_Periodo(p_ctlg As String, p_Anio As Integer, p_Mes As Integer) As String

        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFS_CREAR_ABRIR_TRIBUTARIO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_Anio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_Mes, ParameterDirection.Input, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_SALIDA").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Periodo_Abrir(p_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_PERIODO_TRIBUTARIO_ABRIR", CommandType.StoredProcedure)
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



End Class
